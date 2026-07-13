import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import site from '../data/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.API_PORT || 4000;
const leadsFile = path.join(__dirname, 'leads.json');

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));
app.use(express.json({ limit: '32kb' }));

function readLeads() {
  try {
    if (!fs.existsSync(leadsFile)) return [];
    return JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
  } catch {
    return [];
  }
}

function writeLeads(leads) {
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'nexbash-api' });
});

app.get('/api/site', (_req, res) => {
  res.json(site);
});

app.get('/api/studios', (_req, res) => {
  res.json(site.studios);
});

app.get('/api/projects', (_req, res) => {
  res.json(site.projects);
});

app.get('/api/industries', (_req, res) => {
  res.json(site.industries);
});

app.get('/api/faq', (_req, res) => {
  res.json(site.faq);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message, company } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'name, email, and message are required',
    });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
  if (!emailOk) {
    return res.status(400).json({ ok: false, error: 'invalid email' });
  }

  const lead = {
    id: Date.now().toString(36),
    name: String(name).trim().slice(0, 120),
    email: String(email).trim().slice(0, 160),
    company: company ? String(company).trim().slice(0, 160) : '',
    message: String(message).trim().slice(0, 2000),
    createdAt: new Date().toISOString(),
  };

  const leads = readLeads();
  leads.push(lead);
  writeLeads(leads);

  res.status(201).json({ ok: true, id: lead.id });
});

app.listen(PORT, () => {
  console.log(`Nexbash API running on http://localhost:${PORT}`);
});
