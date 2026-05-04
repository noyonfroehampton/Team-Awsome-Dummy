const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Express to use Pug as the view engine
app.set('view engine', 'pug');

// Tell Express where to find your Pug files (create a 'views' folder for this)
app.set('views', path.join(__dirname, 'views'));

// This is required to serve CSS, images, and client-side JS
app.use('/static', express.static(path.join(__dirname, 'static')));

// Define the route for the index homepage
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'MVP Homepage', 
        message: 'Welcome to the Team Awesome MVP!' 
    });
});

// Import the database pool you created
const db = require('./app/services/db');

// Create the new route for the categories page
app.get('/categories', async (req, res) => {
    try {
        // Fetch data from both tables
        const [platforms] = await db.query('SELECT * FROM platforms ORDER BY name ASC');
        const [tags] = await db.query('SELECT * FROM tags ORDER BY name ASC');

        // Render the categories.pug file and pass the database records to it
        res.render('categories', { 
            title: 'Categories & Platforms',
            platforms: platforms,
            tags: tags
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Error connecting to the database.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});