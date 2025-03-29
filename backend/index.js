    const express = require('express');
    const cors = require('cors');
    const nazioniRoutes = require('./routes/nazioni');
    const comuniRoutes = require('./routes/comuni');
    const associati = require('./routes/associati');
    const altre_associazioni =require('./routes/altre_associazioni');
    const residenze = require('./routes/residenze');
    


    const app = express();
    const port = 5000;

    app.use(cors());
    app.use(express.json());

    app.use('/nazioni', nazioniRoutes);
    app.use('/comuni', comuniRoutes);
    app.use('/associati', associati);
    app.use('/elencoassociazioni', altre_associazioni);
    app.use('/residenze', residenze);
    
    //const db = require('./db/database')

    app.listen(port, () => {
      console.log(`Server in ascolto sulla porta ${port}`);
    });