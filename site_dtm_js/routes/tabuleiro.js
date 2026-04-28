const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const id = parseInt(req.query.id);

  if (!id) {
    return res.redirect('/home');
  }

  const sql = `SELECT * FROM jogos_info WHERE id = ?`;

  db.get(sql, [id], (err, jogo) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar o jogo.');
    }

    if (jogo) {
      res.render('tabuleiro', { jogo });
    } else {
      res.status(404).send('<h1>Jogo não encontrado.</h1>');
    }
  });
});

module.exports = router;