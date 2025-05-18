const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('calculations.db');

// Initialize the database table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS calculations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      expression TEXT NOT NULL,
      result TEXT NOT NULL
    )
  `);
});

function logCalculation(expression, result) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO calculations (expression, result) VALUES (?, ?)`,
      [expression, result.toString()],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}


function getHistory(limit = 50) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, expression, result FROM calculations ORDER BY id DESC LIMIT ?`,
      [limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

module.exports = {
  db,
  logCalculation,
  getHistory,
};
