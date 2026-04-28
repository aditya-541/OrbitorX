const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || null;
const pool = new Pool({ connectionString });

// Ensure messages table exists
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        status TEXT
      );
    `);
  } catch (err) {
    console.error('Failed to ensure messages table:', err.message || err);
  }
})();

module.exports = {
  async get(key) {
    if (key !== 'messages') return [];
    const res = await pool.query('SELECT id, name, email, message, created_at AS "createdAt", status FROM messages ORDER BY created_at DESC');
    return res.rows;
  },
  async insert(key, item) {
    if (key !== 'messages') return null;
    const q = 'INSERT INTO messages(id, name, email, message, created_at, status) VALUES($1,$2,$3,$4,$5,$6)';
    await pool.query(q, [item.id, item.name, item.email, item.message, item.createdAt || new Date().toISOString(), item.status || 'new']);
    return item;
  },
  async clear(key) {
    if (key !== 'messages') return;
    await pool.query('DELETE FROM messages');
  },
  async close() {
    await pool.end();
  }
};
