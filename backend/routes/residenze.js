const express = require("express");
const router = express.Router();
const db = require("../db/database"); // Importa il file database.js

// @route   POST api/residenze
// @desc    Crea una nuova residenza
// @access  Public (Da adattare con l'autenticazione)
router.post("/", async (req, res) => {
  try {
    // Estrai i dati dalla richiesta (req.body)
    const { tipo, via, numero, cap } = req.body;

    // Esegui la query per creare la residenza
    const result = await db.executeQuery(db.associatiPool,
      "INSERT INTO residenze (tipo, via, numero, cap) VALUES (?, ?, ?, ?)",
      [tipo, via, numero, cap]
    );

    res.status(201).json({
      message: "Residenza aggiunta con successo",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore durante l'aggiunta della residenza.");
  }
});

// @route   GET api/residenze/:id
// @desc    Ottieni una residenza specifica tramite ID
// @access  Public (Da adattare con l'autenticazione)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Esegui la query per ottenere la residenza
    const residenza = await db.executeQuery(db.associatiPool,
      "SELECT * FROM residenze WHERE id = ?",
      [id]
    );

    if (residenza.length === 0) {
      res.status(404).send("Residenza non trovata");
    } else {
      res.json(residenza[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore del server.");
  }
});

// @route   PUT api/residenze/:id
// @desc    Aggiorna una residenza esistente tramite ID
// @access  Public (Da adattare con l'autenticazione)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { tipo, via, numero, cap } = req.body;

    // Esegui la query per aggiornare la residenza
    await db.executeQuery(db.associatiPool,
      "UPDATE residenze SET tipo = ?, via = ?, numero = ?, cap = ? WHERE id = ?",
      [tipo, via, numero, cap, id]
    );

    res.json({ message: "Residenza aggiornata con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore durante l'aggiornamento della residenza.");
  }
});

// @route   DELETE api/residenze/:id
// @desc    Elimina una residenza esistente tramite ID
// @access  Public (Da adattare con l'autenticazione)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Esegui la query per eliminare la residenza
    await db.executeQuery(db.associatiPool,"DELETE FROM residenze WHERE id = ?", [id]);

    res.json({ message: "Residenza eliminata con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore durante l'eliminazione della residenza.");
  }
});

module.exports = router;