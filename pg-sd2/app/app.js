// 1. Import your models at the top of app.js (assuming you placed them in app/models/)
const { User } = require('./models/user');
const { Game } = require('./models/game');

// ... [Your existing Express setup, app.set('view engine', 'pug'), etc.] ...

// 2. Home Page Route (The community landing page)
app.get('/', function(req, res) {
    res.render('index');
});

// 3. Games Listing Route (Sharing our community game library)
app.get('/games', async function(req, res) {
    try {
        const gamesData = await Game.getAllGames();
        // Passes the 'heading' and 'data' variables expected by games-listing.pug
        res.render('games-listing', { heading: 'Community Game Library', data: gamesData });
    } catch (err) {
        console.error("Error fetching games:", err);
        res.status(500).send("Error loading the community library");
    }
});

// 4. User Profile Route (Building community connections)
app.get('/profile/:id', async function(req, res) {
    try {
        const userId = req.params.id; // Get the ID from the URL
        const user = new User(userId);
        
        // Fetch data using the methods defined in your user.js model
        await user.getUserDetails();
        const featuredPosts = await user.getFeaturedPosts();
        
        // Passes the 'user' and 'posts' variables expected by user-profile.pug
        res.render('user-profile', { user: user, posts: featuredPosts });
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).send("Error loading user profile");
    }
});