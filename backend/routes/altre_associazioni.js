const express = require('express');
    const router = express.Router();
    const db = require('../db/database');

    // Rotta per ottenere tutti i altre_associazioni    
    router.get('/', async (req, res) => {
        try {
            const altre_associazioni = await db.executeQuery(db.associatiPool,
                                                            'SELECT * FROM altre_associazioni');
            res.json(altre_associazioni);
          } catch (err) {
            console.error(err);
            res.status(500).send('Errore del server');
          }
        });
    
    //Rotta per inserire le associazioni
    // @route   POST api/altre_associazioni
// @desc    Crea una nuova associazione
// @access  Public (da modificare con l'autenticazione)
router.post('/', async (req, res) => {
  try {
      const { nome_associazione } = req.body;
      // Esegui la query per creare la nuova associazione
      const result = await db.executeQuery(db.associatiPool,
          'INSERT INTO altre_associazioni (nome_associazione) VALUES (?)',
          [nome_associazione]
      );

      // Invia una risposta al client
      //res.status(201).json({ message: 'Associazione creata con successo', id: result.insertId });
      res.status(201).json({ message: 'Associazione creata con successo'});
      } catch (err) {
          console.error(err);
          res.status(500).send('Errore durante la creazione dell\'associazione.');
      }
    });

// Cancellazione di una associazione
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        // Esegui la query per eliminare l'associazione
        const result = await db.executeQuery(db.associatiPool,
            'DELETE FROM altre_associazioni WHERE id = ?',
            [id]
        );
        res.status(200).json({ message: 'Associazione cancellata con successo'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Errore durante l\'eliminazione dell\'associazione.');
    }
      });

        //aggiornamento di una associazione
        router.put('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { nome_associazione } = req.body; // Assicurati che il nome della colonna sia corretto
                // Esegui la query per aggiornare l'associazione
                const result = await db.executeQuery(db.associatiPool,
                    'UPDATE altre_associazioni SET nome_associazione = ? WHERE id = ?',
                    [nome_associazione, id]
                );
                res.status(200).json({ message: 'Associazione aggiornata con successo'}); 
            } catch (err) {
                console.error(err);
                res.status(500).send('Errore durante l\'aggiornamento dell\'associazione.'); 
            }  
        })
        //esporta il modulo
        module.exports = router;