const express = require('express');
const path = require('path');
const app = express(); 
const db = require('./app/services/db'); //

// Setup View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Setup Static Files (for CSS and Images)
app.use(express.static(path.join(__dirname, 'static')));

// --- ROUTES ---

// 1. Home Page
app.get('/', async (req, res) => {
  const sql = `
    SELECT 
      g.id, g.title, g.description, g.release_year, g.metacritic_score,
      GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS tags,
      GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS platforms
    FROM games g
    LEFT JOIN game_tags gt ON g.id = gt.game_id
    LEFT JOIN tags t ON gt.tag_id = t.id
    LEFT JOIN game_platforms gp ON g.id = gp.game_id
    LEFT JOIN platforms p ON gp.platform_id = p.id
    GROUP BY g.id
    ORDER BY g.metacritic_score DESC
    LIMIT 10`;

  try {
    const [topGames] = await db.query(sql);
    // Passing topGames to the index template
    res.render('index', { topGames });
  } catch (err) {
    console.error("Home page error:", err);
    res.status(500).send("Database Error");
  }
});

// 2. Categories Page[cite: 1]
app.get('/categories', async (req, res) => {
  try {
    const [tags] = await db.query('SELECT * FROM tags');
    const [platforms] = await db.query('SELECT * FROM platforms');
    
    res.render('categories', { tags, platforms });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Database Error");
  }
});

// 2. Updated Detail Route
app.get('/game/:id', async (req, res) => {
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
    const [results] = await db.query(sql, [req.params.id]);
    if (results.length > 0) {
      res.render('game-detail', { game: results[0] });
    } else {
      res.status(404).send('Game not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// 1. Updated Listing Route
app.get('/games', async (req, res) => {
  const sql = `
    SELECT 
      g.id, g.title, g.description, g.release_year, g.metacritic_score,
      GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS tags,
      GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS platforms
    FROM games g
    LEFT JOIN game_tags gt ON g.id = gt.game_id
    LEFT JOIN tags t ON gt.tag_id = t.id
    LEFT JOIN game_platforms gp ON g.id = gp.game_id
    LEFT JOIN platforms p ON gp.platform_id = p.id
    GROUP BY g.id`;

  try {
    const [rows] = await db.query(sql);
    res.render('games', { games: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Test Game Link: http://localhost:${PORT}/game/1`);
});