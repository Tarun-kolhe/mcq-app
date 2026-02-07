const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mcq.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      option1 TEXT,
      option2 TEXT,
      option3 TEXT,
      option4 TEXT,
      answer TEXT
    )
  `);
});

module.exports = db;
