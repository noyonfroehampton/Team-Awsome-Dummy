const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secretpassword', // Match your env-sample
  database: process.env.DB_DATABASE || 'team_awesome',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create a promise-based version of the pool
const db = pool.promise();

/**
 * Function to search both games and posts tables
 * This is attached to the db object so it can be exported together
 */
db.searchContent = async function(query) {
    const searchTerm = `%${query}%`;
    
    // Search Games table
    const [games] = await db.query(
        "SELECT id, title, 'game' as type FROM games WHERE title LIKE ? OR description LIKE ?", 
        [searchTerm, searchTerm]
    );

    // Search Posts table
    const [posts] = await db.query(
        "SELECT id, title, 'post' as type FROM posts WHERE title LIKE ? OR content LIKE ?", 
        [searchTerm, searchTerm]
    );

    return { games, posts };
};

// Debug connection in Docker logs
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the MySQL database.');
    connection.release();
  }
});

// Export the promise pool with the new searchContent function attached
module.exports = db;