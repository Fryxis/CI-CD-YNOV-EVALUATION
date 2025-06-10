const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./iot.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS infos (id INTEGER PRIMARY KEY AUTOINCREMENT, device_id TEXT, temperature DECIMAL, humidity DECIMAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, type TEXT)', (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
    }
  });
});

module.exports = db;