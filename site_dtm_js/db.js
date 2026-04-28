const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'tdm_db.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Falha na conexão SQLite: ' + err.message);
    process.exit(1);
  }
  console.log('Conectado ao banco SQLite!');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jogos_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      origem TEXT,
      jogadores TEXT,
      imagem_url TEXT,
      historia TEXT,
      regras TEXT,
      categoria TEXT,
      nota REAL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      usuario TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT,
      senha TEXT NOT NULL
    )
  `);
});

module.exports = db;