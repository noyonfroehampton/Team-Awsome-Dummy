const express = require('express');
const path = require('path');
const app = express(); // This line initializes 'app' so .set() will work

// Setup View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Setup Static Files (for CSS and Images)
app.use(express.static(path.join(__dirname, 'static')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Add this route to your index.js
const db = require('./app/services/db');

app.get('/categories', async (req, res) => {
  try {
    // Assuming your sd2-db.sql has tables named 'tags' and 'platforms'
    const [tags] = await db.query('SELECT * FROM tags');
    const [platforms] = await db.query('SELECT * FROM platforms');
    
    res.render('categories', { tags, platforms });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Database Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});