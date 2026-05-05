const express = require('express');
const path = require('path');
const app = express();
// Import the database connection from the services folder
const db = require('./services/db');

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, '../static')));

// --- ROUTES ---

// 1. Home Page - List all games
app.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM games';
        const [rows] = await db.query(sql);
        res.render('index', { games: rows });
    } catch (err) {
        console.error("Home page error:", err);
        res.status(500).send('Error loading home page');
    }
});

// 2. Game Detail Page - Fetch specific game with Tags and Platforms
app.get('/game/:id', async (req, res) => {
    const gameId = req.params.id;

    // This query joins games with their tags and platforms via junction tables
    const sql = `
        SELECT 
            g.*, 
            GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS tags,
            GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS platforms
        FROM games g
        LEFT JOIN game_tags gt ON g.id = gt.game_id
        LEFT JOIN tags t ON gt.tag_id = t.id
        LEFT JOIN game_platforms gp ON g.id = gp.game_id
        LEFT JOIN platforms p ON gp.platform_id = p.id
        WHERE g.id = ?
        GROUP BY g.id`;

    try {
        const [results] = await db.query(sql, [gameId]);
        
        if (results.length > 0) {
            // Render the 'game-detail.pug' view with the game data
            res.render('game-detail', { game: results[0] });
        } else {
            res.status(404).send('Game not found');
        }
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send('Internal Server Error');
    }
});

// 3. Category Page - Existing project view
app.get('/categories', (req, res) => {
    res.render('categories');
});

// Export the app object so it can be used by index.js[cite: 1]
module.exports = app;