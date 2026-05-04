require("dotenv").config();

const mysql = require('mysql2/promise');

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: process.env.DB_CONTAINER,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};
  
const pool = mysql.createPool(config.db);

const mysql = require('mysql2/promise');

// Create a connection pool using environment variables
// These will be defined in your docker-compose.yml later
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'team_awesome_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

// Utility function to query the database
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = {
  query,
}