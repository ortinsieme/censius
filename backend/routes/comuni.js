    const express = require('express');
    const router = express.Router();
    const db = require('../db/database');

    // Rotta per ottenere tutti i comuni
    router.get('/', async (req, res) => {
      try {
        const comuni = await db.executeQuery(db.comuniPool,'SELECT * FROM comuni_cap');
        res.json(comuni);
      } catch (err) {
        console.error(err);
        res.status(500).send('Errore del server');
      }
    });

    // Rotta per ottenere un comune specifico dato il codice ISTAT
    router.get('/:codice_istat', async (req, res) => {
      try {
        const codiceIstat = req.params.codice_istat;
        const comune = await db.executeQuery(db.comuniPool,
          'SELECT * FROM comuni_cap WHERE codice_istat = ?',
          [codiceIstat]
        );
        if (comune.length === 0) {
          res.status(404).send('Comune non trovato');
        } else {
          res.json(comune[0]);
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Errore del server');
      }
    });

    // Rotta per ottenere tutti i comuni con lo stesso cap
    router.get('/cap/:cap', async (req, res) => {
      try {
        const cap = req.params.cap;
        const comuni = await db.executeQuery(db.comuniPool,
          'SELECT * FROM comuni_cap WHERE cap = ?',
          [cap]
        );
        res.json(comuni);
      } catch (err)
      {
        console.error(err);
        res.status(500).send('Errore del server'); 
      }
    });

    //eposrta il modulo
    module.exports = router;