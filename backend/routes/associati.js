    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const db = require('../db/database'); // Importa il file database.js

    
     // Configurazione di Multer
     const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory dove salvare i file
    },
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // Nome file univoco
    },
    });

    const upload = multer({ storage: storage });
    
    // @route   POST api/associati
    // @desc    Crea un nuovo associato
    // @access  Public (da modificare con l'autenticazione)
    router.post('/', async (req, res) => {
    try {
    const {
    nome,
    cognome,
    codice_fiscale,
    data_nascita,
    email,
    telefono,
    residenza_id,
    nazione_nascita_codice,
    } = req.body;

    const result = await db.executeQuery(db.associatiPool,
    `INSERT INTO associati (nome, cognome, codice_fiscale, data_nascita, email, telefono, residenza_id, nazione_nascita_codice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nome, cognome, codice_fiscale, data_nascita, email, telefono, residenza_id, nazione_nascita_codice]
    );

    res.status(201).json({ message: 'Associato aggiunto con successo', id: result.insertId });
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore durante l\'aggiunta dell\'associato.');
    }
    });

    // @route   GET api/associati
    // @desc    Ottiene tutti gli associati
    // @access  Public (da modificare con l'autenticazione)
    router.get('/', async (req, res) => {
    try {
    const associati = await db.executeQuery(db.associatiPool,'SELECT * FROM associati');
    res.json(associati);
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore del server');
    }
    });

    // @route   GET api/associati/:id
    // @desc    Ottiene un associato tramite ID
    // @access  Public (da modificare con l'autenticazione)
    router.get('/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const associato = await db.executeQuery(db.associatiPool,'SELECT * FROM associati WHERE id = ?', [id]);
    if (associato.length === 0) {
    res.status(404).send('Associato non trovato');
    } else {
    res.json(associato[0]);
    }
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore del server');
    }
    });

    // @route   PUT api/associati/:id
    // @desc    Aggiorna un associato tramite ID
    // @access  Public (da modificare con l'autenticazione)
    router.put('/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const {
    nome,
    cognome,
    codice_fiscale,
    data_nascita,
    email,
    telefono,
    residenza_id,
    nazione_nascita_codice,
    } = req.body;

    await db.executeQuery(db.associatiPool,
    `UPDATE associati SET nome = ?, cognome = ?, codice_fiscale = ?, data_nascita = ?, email = ?, telefono = ?, residenza_id = ?, nazione_nascita_codice = ? WHERE id = ?`,
    [nome, cognome, codice_fiscale, data_nascita, email, telefono, residenza_id, nazione_nascita_codice, id]
    );

    res.json({ message: 'Associato aggiornato con successo' });
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore durante l\'aggiornamento dell\'associato.' );
    }
    });

    // @route   DELETE api/associati/:id
    // @desc    Elimina un associato tramite ID
    // @access  Public (da modificare con l'autenticazione)
    router.delete('/:id', async (req, res) => {
    try {
    const id = req.params.id;
    await db.executeQuery(db.associatiPool,'DELETE FROM associati WHERE id = ?', [id]);
    res.json({ message: 'Associato eliminato con successo' });
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore durante l\'eliminazione dell\'associato.' );
    }
    });

    // Rotta per il caricamento dei file (POST /associati/:id/documenti)
    router.post('/:id/documenti', upload.single('documento'), async (req, res) => {
    try {
        const associatoId = req.params.id;
        const filename = req.file.filename; // Nome del file salvato
        const filePath = req.file.path; // Percorso completo del file
    
        // Salva il riferimento al file nel database
        await db.executeQuery(db.associatiPool,
        'INSERT INTO file_associato (associato_id, tipo_file_id, percorso_file, nome_file, data_caricamento) VALUES (?, ?, ?, ?, NOW())',
        [associatoId, req.body.tipo_file_id, filePath, req.file.originalname]
        );

    res.status(201).json({ message: 'Documento caricato con successo', filename });
    } catch (err) {
    console.error(err);
    res.status(500).send('Errore durante il caricamento del documento.');
    }
    });



    module.exports = router;