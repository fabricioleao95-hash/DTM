const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT id, titulo, origem, jogadores, imagem_url, historia, regras,
           COALESCE(categoria, 'estrategia') AS categoria,
           COALESCE(nota, '') AS nota
    FROM jogos_info ORDER BY titulo ASC
  `;

  db.query(sql, (err, jogos) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar jogos: ' + err.message);
    }

    // Prepara o resumo da história (equivalente ao $excerpt do PHP)
    jogos = jogos.map(jogo => {
      const historiaShort = jogo.historia
        ? jogo.historia.substring(0, 120) + (jogo.historia.length > 120 ? '...' : '')
        : '';
      return { ...jogo, historiaShort };
    });

    // Renderiza o template EJS passando os jogos
    res.render('catalogo', { jogos });
  });
});

module.exports = router;