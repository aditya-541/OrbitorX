const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'db.json');

function read() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return { messages: [] };
  }
}

function write(payload) {
  fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2));
}

module.exports = {
  get(key) {
    const data = read();
    return data[key] || [];
  },
  insert(key, item) {
    const data = read();
    if (!data[key]) data[key] = [];
    data[key].push(item);
    write(data);
    return item;
  },
  clear(key) {
    const data = read();
    data[key] = [];
    write(data);
  }
};
