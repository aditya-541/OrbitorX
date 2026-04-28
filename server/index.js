const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { nanoid } = require('nanoid');
const db = require('./lib/db');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.get('/api/v1/info', (req, res) => {
  res.json({ name: 'OrbitorX Backend', version: '0.1.0' });
});

// Public contact endpoint — stores message in local JSON DB
app.post('/api/v1/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!message || !email) return res.status(400).json({ error: 'email and message required' });

  const item = { id: nanoid(), name: name || null, email, message, createdAt: new Date().toISOString(), status: 'new' };
  db.insert('messages', item);
  res.status(202).json({ ok: true, id: item.id });
});

// Admin: list messages (requires API key)
app.get('/api/v1/messages', (req, res) => {
  const key = req.header('x-api-key') || req.query.api_key;
  if (!process.env.API_KEY || key !== process.env.API_KEY) return res.status(401).json({ error: 'unauthorized' });
  const messages = db.get('messages');
  res.json({ count: messages.length, messages });
});

// Simple 404
app.use((req, res) => res.status(404).json({ error: 'not_found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

const server = app.listen(PORT, () => {
  console.log(`OrbitorX backend listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
