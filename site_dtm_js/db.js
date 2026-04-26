const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3307,        // ← porta que você mudou no XAMPP
  user: 'root',
  password: '',
  database: 'tdm_db',
  charset: 'utf8mb4'
});

conexao.connect((err) => {
  if (err) {
    console.error('Falha na conexão: ' + err.message);
    process.exit(1);
  }
  console.log('Conectado ao banco!');
});

module.exports = conexao;