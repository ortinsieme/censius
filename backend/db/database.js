/*const mariadb = require('mariadb');
    const config = require('./config.json');

    const pool = mariadb.createPool(config.comuniDB); // Usa config.comuniDB per i comuni

    async function executeQuery(sql, values) {
      let conn;
      try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql, values);
        return rows;
      } catch (err) {
        throw err;
      } finally {
        if (conn) conn.release();
      }
    }

    module.exports = { executeQuery };
    */
    const mariadb = require('mariadb');
    const config = require('./config.json');

    // Pool per ASSOCIATIDB
    const associatiPool = mariadb.createPool(config.associatiDB);

    // Pool per COMUNIDB
    const comuniPool = mariadb.createPool(config.comuniDB);

    // Funzione per eseguire query (specificando il pool)
    async function executeQuery(pool, sql, values) {
      let conn;
      try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql, values);
        return rows;
      } catch (err) {
        throw err;
      } finally {
        if (conn) conn.release();
      }
    }

    module.exports = {
      associatiPool,
      comuniPool,
      executeQuery
    };