    const express = require('express');
    const router = express.Router();
    const db = require('../db/database'); // Importa il file database.js

    // Rotta per ottenere tutte le nazioni
    router.get('/', async (req, res) => {
      try {
        const nazioni = await db.executeQuery(db.comuniPool,'SELECT * FROM nazioni');
        res.json(nazioni);
      } catch (err) {
        console.error(err);
        res.status(500).send('Errore del server');
      }
    });

    // Rotta per ottenere una nazione specifica
    router.get('/:codice_iso_3', async (req, res) => {
      const nazioneId = req.params.codice_iso_3; 

      try {
        const nazione = await db.executeQuery(db.comuniPool,'SELECT * FROM nazioni WHERE codice_iso_3 = ?', [nazioneId]);

        if (nazione.length === 0) {
          return res.status(404).json({ error: 'Nazione non trovata' });
        }

        res.json(nazione[0]);
          
      }  
      catch (err) {
        console.error(err);
        res.status(500).send('Errore del server');
      }
    })

    module.exports = router;