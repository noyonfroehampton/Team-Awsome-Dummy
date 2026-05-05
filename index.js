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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});