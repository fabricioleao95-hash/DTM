const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - lista jogos
router.get('/', (req, res) => {
  const sql = `
    SELECT id, titulo, origem, jogadores, imagem_url, historia, regras,
           COALESCE(categoria, 'estrategia') AS categoria,
           COALESCE(nota, '') AS nota
    FROM jogos_info ORDER BY titulo ASC
  `;

  db.all(sql, (err, jogos) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar jogos: ' + err.message);
    }

    jogos = jogos.map(jogo => {
      const historiaShort = jogo.historia
        ? jogo.historia.substring(0, 120) + (jogo.historia.length > 120 ? '...' : '')
        : '';
      return { ...jogo, historiaShort };
    });

    res.render('catalogo', { jogos });
  });
});

// POST - adiciona novo jogo
router.post('/adicionar', (req, res) => {
  const { titulo, origem, jogadores, imagem_url, historia, regras, categoria, nota } = req.body;

  if (!titulo) {
    return res.status(400).send('O título é obrigatório.');
  }

  const sql = `
    INSERT INTO jogos_info (titulo, origem, jogadores, imagem_url, historia, regras, categoria, nota)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [titulo, origem, jogadores, imagem_url, historia, regras, categoria, nota || null], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar jogo: ' + err.message);
    }

    res.redirect('/catalogo');
  });
});

module.exports = router;