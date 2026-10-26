import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_SERVICES = [
  'Accounting & Bookkeeping',
  'Tax Compliance',
  'Financial Reporting',
  'Payroll Management',
  'Business Advisory',
  'Audit Support',
] as const;

interface InquiryPayload {
  fullName?: string;
  businessEmail?: string;
  companyName?: string;
  serviceRequired?: string;
  message?: string;
}

const INQUIRIES_STORAGE_PATH = path.join(os.tmpdir(), 'balentra-inquiries.json');

async function saveInquiryRecord(record: Record<string, unknown>) {
  let existing: Record<string, unknown>[] = [];
  try {
    const raw = await fs.readFile(INQUIRIES_STORAGE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  await fs.writeFile(INQUIRIES_STORAGE_PATH, JSON.stringify(existing, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '64kb' }));

  app.post('/api/inquiries', async (req, res) => {
    try {
      const body = (req.body || {}) as InquiryPayload;
      const fullName = (body.fullName || '').trim();
      const businessEmail = (body.businessEmail || '').trim();
      const companyName = (body.companyName || '').trim();
      const serviceRequired = (body.serviceRequired || '').trim();
      const message = (body.message || '').trim();

      const errors: Record<string, string> = {};

      if (fullName.length < 2) {
        errors.fullName = 'Please enter your full name.';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
        errors.businessEmail = 'Please enter a valid business email address.';
      }
      if (!companyName) {
        errors.companyName = 'Please enter your company name.';
      }
      if (!VALID_SERVICES.includes(serviceRequired as (typeof VALID_SERVICES)[number])) {
        errors.serviceRequired = 'Please select one of our six established services.';
      }
      if (message.length < 10) {
        errors.message = 'Please include a brief message (at least 10 characters).';
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json({
          ok: false,
          error: 'Please check the highlighted form fields and try again.',
          fieldErrors: errors,
        });
        return;
      }

      const inquiryId = `BAL-${Date.now().toString(36).toUpperCase()}`;
      const submittedAt = new Date().toISOString();

      const record = {
        inquiryId,
        fullName,
        businessEmail,
        companyName,
        serviceRequired,
        message,
        submittedAt,
      };

      await saveInquiryRecord(record);

      // Optional server-side webhook forwarding if configured via environment variable
      const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
      if (webhookUrl) {
        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        if (!webhookRes.ok) {
          res.status(502).json({
            ok: false,
            error: 'Unable to deliver inquiry to the configured destination. Please try again later.',
          });
          return;
        }
      }

      res.status(201).json({
        ok: true,
        inquiryId,
        submittedAt,
      });
    } catch {
      res.status(500).json({
        ok: false,
        error: 'An unexpected error occurred while submitting your inquiry. Please try again.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Balentra server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
