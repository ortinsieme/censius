    const mariadb = require('mariadb');
    const config = require('./db/config.json');

    let associatiPool;

    async function initializePool() {
      try {
        associatiPool = mariadb.createPool(config.associatiDB);
        console.log('Pool di connessioni inizializzato correttamente.');
      } catch (err) {
        console.error('Errore durante l\'inizializzazione del pool:', err);
        throw err;
      }
    }

    async function executeQuery(sql, values) {
      if (!associatiPool) {
        throw new Error('Pool di connessioni non inizializzato.');
      }

      let conn;
      try {
        conn = await associatiPool.getConnection();
        const rows = await conn.query(sql, values);
        return rows;
      } catch (err) {
        throw err;
      } finally {
        if (conn) conn.release();
      }
    }

    async function getAssociati() {
      try {
        const associati = await executeQuery('SELECT * FROM associati');
        console.log(associati);
      } catch (err) {
        console.error(err);
      }
    }

    async function main() {
      try {
        await initializePool();
        await getAssociati();
      } catch (err) {
        console.error('Errore nel main:', err);
      }
    }

    main();