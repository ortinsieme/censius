    const mariadb = require('mariadb');
    const config = require('./db/config.json')  ;

    let comuniPool;

    async function initializePool() {
      try {
        comuniPool = mariadb.createPool(config.comuniDB);
        console.log('Pool di connessioni inizializzato correttamente.');
      } catch (err) {
        console.error('Errore durante l\'inizializzazione del pool:', err);
        throw err;
      }
    }

    async function executeQuery(sql, values) {
      if (!comuniPool) {
        throw new Error('Pool di connessioni non inizializzato.');
      }

      let conn;
      try {
        conn = await comuniPool.getConnection();
        const rows = await conn.query(sql, values);
        return rows;
      } catch (err) {
        throw err;
      } finally {
        if (conn) conn.release();
      }
    }

    async function getComuni() {
      try {
        const comuni = await executeQuery('SELECT * FROM comuni_cap');
        console.log(comuni);
      } catch (err) {
        console.error(err);
      }
    }

    async function main() {
      try {
        await initializePool();
        await getComuni();
      } catch (err) {
        console.error('Errore nel main:', err);
      }
    }

    main();