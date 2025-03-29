    const express = require('express');
    const router = express.Router();
    const db = require('../db/database');

    // @route   POST api/documenti
    // @desc    Crea un nuovo documento
    // @access  Public (da modificare con l'autenticazione)
    router.post('/', async (req, res) => {
    try {
    const { associato_id, tipo, codice, emesso_da, data_inizio, data_fine } = req.body;

    const result = await db.executeQuery(db.associatiPool,
    `INSERT INTO documenti (associato_id, tipo, codice, emesso_da, data_inizio, data_fine) VALUES (?, ?, ?, ?, ?, ?)`,
    [associato_id, tipo, codice, emesso_da, data_inizio, data_fine]
    );

    res.status(201).json({ message: 'Documento creato con successo', id: result.insertId });
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore durante la creazione del documento.' );
    }
    });

    // @route   GET api/documenti/:id
    // @desc    Ottiene un documento tramite ID
    // @access  Public (da modificare con l'autenticazione)
    router.get('/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const documento = await db.executeQuery(db.associatiPool,'SELECT * FROM documenti WHERE id = ?', [id]);
    if (documento.length === 0) {
    res.status(404).send('Documento non trovato');
    } else {
    res.json(documento[0]);
    }
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore del server.' );
    }
    });

    // ... (implementazione delle rotte PUT e DELETE simili) ...

    module.exports = router;