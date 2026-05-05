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
// Replace your existing 1. Home Page route in index.js with this:
app.get('/', async (req, res) => {
  // Existing query for top games
  const gamesSql = `
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

  // Query for Top 3 Trending Posts in the last 24 hours
  const trendingPostsSql = `
    SELECT p.id, p.title, p.total_rating, u.nickname AS username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.post_timestamp >= NOW() - INTERVAL 1 DAY
    ORDER BY p.total_rating DESC
    LIMIT 3
  `;

  // Query for Top 10 Most Rated Posts of all time
  const topPostsSql = `
    SELECT p.id, p.title, p.total_rating, u.nickname AS username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.total_rating DESC
    LIMIT 10
  `;

  try {
    // Execute all queries concurrently for better performance
    const [
      [topGames],
      [trendingPosts],
      [topPosts]
    ] = await Promise.all([
      db.query(gamesSql),
      db.query(trendingPostsSql),
      db.query(topPostsSql)
    ]);

    // Pass all three datasets to the index template
    res.render('index', { 
      topGames, 
      trendingPosts, 
      topPosts 
    });
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

// Add this route to your app.js or router
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // 1. Fetch User Data
        const [userResult] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        
        if (userResult.length === 0) {
            return res.status(404).send('User not found');
        }
        const user = userResult[0];

        // 2. Fetch User Posts (Joining with flairs to get the flair name)
        const postQuery = `
            SELECT p.*, f.Flair_Name 
            FROM posts p 
            LEFT JOIN flairs f ON p.flair_id = f.id 
            WHERE p.user_id = ? 
            ORDER BY p.post_timestamp DESC
        `;
        const [posts] = await db.query(postQuery, [userId]);

        // 3. Render the Pug template
        res.render('profile', { 
            title: `${user.full_name}'s Profile`, 
            user: user, 
            posts: posts 
        });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/post/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        // 1. Fetch Post Data[cite: 4]
        const postQuery = `
        SELECT 
            p.*, 
            u.nickname, 
            f.Flair_Name, 
            g.title AS game_name, 
            pl.name AS platform_name
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN flairs f ON p.flair_id = f.id
        LEFT JOIN games g ON p.game = g.id
        LEFT JOIN platforms pl ON p.platform = pl.id
        WHERE p.id = ?
        `;
        const [postResult] = await db.query(postQuery, [postId]);
        if (postResult.length === 0) return res.status(404).send('Post not found');
        const post = postResult[0];

        // 2. Fetch Comments[cite: 4]
        const commentsQuery = `
            SELECT c.*, u.nickname 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.comment_timestamp ASC
        `;
        const [comments] = await db.query(commentsQuery, [postId]);

        // 3. Fetch Replies for all comments on this post[cite: 3]
        const repliesQuery = `
            SELECT r.*, u.nickname 
            FROM replies r
            JOIN users u ON r.user_id = u.id
            JOIN comments c ON r.comment_id = c.id
            WHERE c.post_id = ?
            ORDER BY r.reply_timestamp ASC
        `;
        const [replies] = await db.query(repliesQuery, [postId]);

        // 4. Render template with posts, comments, and replies
        res.render('post', { 
            title: post.title, 
            post: post, 
            comments: comments,
            replies: replies 
        });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Replace the dummy app.get('/posts', ...) with this:
// Updated Route in index.js
app.get('/posts', async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id,
                p.title,
                u.nickname AS username,
                DATE_FORMAT(p.post_timestamp, '%Y-%m-%d') AS date,
                f.Flair_Name AS flair,
                g.title AS game_name,
                pl.name AS platform_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN flairs f ON p.flair_id = f.id
            LEFT JOIN games g ON p.game = g.id
            LEFT JOIN platforms pl ON p.platform = pl.id
            ORDER BY p.post_timestamp DESC;
        `;
        
        const [posts] = await db.query(query);

        res.render('posts', { 
            title: 'Post List', 
            posts: posts 
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Route to show games filtered by a specific tag
app.get('/tags/:id', async (req, res) => {
  const tagId = req.params.id;
  const sql = `
    SELECT 
      g.id, g.title, g.description, g.release_year, g.metacritic_score,
      GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS tags,
      GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS platforms
    FROM games g
    JOIN game_tags gt_filter ON g.id = gt_filter.game_id
    LEFT JOIN game_tags gt ON g.id = gt.game_id
    LEFT JOIN tags t ON gt.tag_id = t.id
    LEFT JOIN game_platforms gp ON g.id = gp.game_id
    LEFT JOIN platforms p ON gp.platform_id = p.id
    WHERE gt_filter.tag_id = ?
    GROUP BY g.id`;

  try {
    const [rows] = await db.query(sql, [tagId]);
    res.render('games', { games: rows, title: `Games with Tag #${tagId}` });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

// Route to show games filtered by a specific platform
app.get('/platform/:id', async (req, res) => {
  const platformId = req.params.id;
  const sql = `
    SELECT 
      g.id, g.title, g.description, g.release_year, g.metacritic_score,
      GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS tags,
      GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS platforms
    FROM games g
    JOIN game_platforms gp_filter ON g.id = gp_filter.game_id
    LEFT JOIN game_tags gt ON g.id = gt.game_id
    LEFT JOIN tags t ON gt.tag_id = t.id
    LEFT JOIN game_platforms gp ON g.id = gp.game_id
    LEFT JOIN platforms p ON gp.platform_id = p.id
    WHERE gp_filter.platform_id = ?
    GROUP BY g.id`;

  try {
    const [rows] = await db.query(sql, [platformId]);
    res.render('games', { games: rows, title: `Games on Platform #${platformId}` });
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