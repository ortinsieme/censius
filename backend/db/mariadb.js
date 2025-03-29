const mariadb = require('mariadb');

// Configurazione della connessione al database
const pool = mariadb.createPool({
  host: 'localhost', // Sostituisci con il tuo host
  user: 'root', // Sostituisci con il tuo nome utente
  password: 'Prova@2520', // Sostituisci con la tua password
  database: 'comunidb', // Sostituisci con il nome del tuo database
  connectionLimit: 5 // Numero massimo di connessioni nel pool
});

// Funzione per eseguire una query
async function executeQuery(sql, values) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); // Rilascia la connessione nel pool
  }
}

// Esempio di utilizzo
async function getNazioni() {
  try {
    const nazioni = await executeQuery('SELECT * FROM nazioni');
    console.log(nazioni);
  } catch (err) {
    console.error(err);
  }
}

getNazioni(); // Chiama la funzione per ottenere le nazioni