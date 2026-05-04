-- Drop tables if they exist to prevent conflicts on restart
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS platforms;

-- Drop junction tables and games table if they exist to prevent conflicts
DROP TABLE IF EXISTS game_tags;
DROP TABLE IF EXISTS game_platforms;
DROP TABLE IF EXISTS games;

-- Create Games Table
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    description TEXT
);

-- Create Junction Table for Games and Platforms
CREATE TABLE game_platforms (
    game_id INT,
    platform_id INT,
    PRIMARY KEY (game_id, platform_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);

-- Create Junction Table for Games and Tags
CREATE TABLE game_tags (
    game_id INT,
    tag_id INT,
    PRIMARY KEY (game_id, tag_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Create Platforms Table
CREATE TABLE platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Tags Table
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Insert Platform Data
INSERT INTO platforms (name) VALUES
    ('Windows'),
    ('Android'),
    ('Game Boy'),
    ('Game Boy Color'),
    ('Game Boy Advance'),
    ('Nintendo 64'),
    ('Nintendo GameCube'),
    ('Nintendo Wii'),
    ('Nintendo Wii U'),
    ('Nintendo Switch'),
    ('PlayStation'),
    ('PlayStation 2'),
    ('PlayStation 3'),
    ('PlayStation 4'),
    ('PlayStation 5'),
    ('Xbox'),
    ('Xbox 360'),
    ('Xbox One'),
    ('Xbox Series X/S'),
    ('Nintendo DS'),
    ('Nintendo 3DS'),
    ('New Nintendo 3DS'),
    ('PlayStation Portable'),
    ('PlayStation Vita'),
    ('Sega Genesis'),
    ('Sega Saturn'),
    ('Sega Dreamcast'),
    ('Sega Game Gear'),
    ('Sega Master System'),
    ('Sega CD'),
    ('Sega 32X');


-- Insert Tag Data (Extracted from your screenshot)
INSERT INTO tags (name) VALUES
    ('Action'),
    ('Action Adventure'),
    ('Adventure'),
    ('Hardware'),
    ('Miscellaneous'),
    ('Puzzle'),
    ('Racing'),
    ('Role-Playing'),
    ('Simulation'),
    ('Sports'),
    ('Strategy');

    -- Insert 100 Sample Games
INSERT INTO games (id, title, release_year, description) VALUES
    (1, 'Super Mario 64', 1996, 'A groundbreaking 3D platformer featuring Mario.'),
    (2, 'The Legend of Zelda: Ocarina of Time', 1998, 'An epic action-adventure game through time.'),
    (3, 'Pokemon Red Version', 1996, 'A classic monster-catching role-playing game.'),
    (4, 'Super Smash Bros. Melee', 2001, 'A fast-paced crossover fighting game.'),
    (5, 'Metroid Prime', 2002, 'A first-person action-adventure exploration game.'),
    (6, 'Animal Crossing', 2001, 'A charming life simulation game with animal villagers.'),
    (7, 'Mario Kart Wii', 2008, 'A chaotic go-kart racing game with motion controls.'),
    (8, 'Wii Sports', 2006, 'A collection of motion-controlled sports minigames.'),
    (9, 'The Legend of Zelda: Breath of the Wild', 2017, 'An expansive open-world adventure game.'),
    (10, 'Super Mario Odyssey', 2017, 'A 3D platformer featuring a sentient hat.'),
    (11, 'Final Fantasy VII', 1997, 'A definitive sci-fi fantasy role-playing game.'),
    (12, 'Metal Gear Solid', 1998, 'A tactical espionage action game.'),
    (13, 'Crash Bandicoot', 1996, 'A linear 3D platformer featuring a mutated bandicoot.'),
    (14, 'God of War', 2005, 'A cinematic hack-and-slash action game based on Greek mythology.'),
    (15, 'Shadow of the Colossus', 2005, 'An atmospheric adventure game focused on giant boss fights.'),
    (16, 'Uncharted 2: Among Thieves', 2009, 'A cinematic action-adventure treasure-hunting game.'),
    (17, 'The Last of Us', 2013, 'A narrative-driven post-apocalyptic survival game.'),
    (18, 'Bloodborne', 2015, 'A dark, gothic action-RPG with punishing combat.'),
    (19, 'Horizon Zero Dawn', 2017, 'An open-world adventure game with robot dinosaurs.'),
    (20, 'Ghost of Tsushima', 2020, 'An open-world samurai action game set in feudal Japan.'),
    (21, 'Halo: Combat Evolved', 2001, 'A revolutionary sci-fi first-person shooter.'),
    (22, 'Gears of War', 2006, 'A gritty cover-based third-person shooter.'),
    (23, 'Fable', 2004, 'An action-RPG where choices determine your alignment.'),
    (24, 'Half-Life 2', 2004, 'A legendary physics-based first-person shooter.'),
    (25, 'Portal', 2007, 'A mind-bending physics puzzle game.'),
    (26, 'Mass Effect 2', 2010, 'A sprawling space opera RPG with impactful choices.'),
    (27, 'The Elder Scrolls V: Skyrim', 2011, 'A massively popular open-world fantasy RPG.'),
    (28, 'Fallout 3', 2008, 'A post-apocalyptic open-world RPG.'),
    (29, 'Doom', 2016, 'A fast-paced, relentless demon-slaying shooter.'),
    (30, 'Forza Horizon 4', 2018, 'An open-world racing game set in Great Britain.'),
    (31, 'Sonic the Hedgehog', 1991, 'A high-speed 2D platformer featuring a blue hedgehog.'),
    (32, 'Streets of Rage 2', 1992, 'A classic side-scrolling beat-em-up game.'),
    (33, 'Phantasy Star IV', 1993, 'A highly regarded 16-bit science fiction RPG.'),
    (34, 'Nights into Dreams', 1996, 'An aerial score-attack game in a dream world.'),
    (35, 'Panzer Dragoon Saga', 1998, 'A rare and acclaimed rail-shooter/RPG hybrid.'),
    (36, 'Shenmue', 1999, 'An ambitious open-world life simulation and adventure game.'),
    (37, 'Crazy Taxi', 1999, 'An arcade-style driving game focused on speed and stunts.'),
    (38, 'Jet Set Radio', 2000, 'A cel-shaded rollerblading and graffiti tagging game.'),
    (39, 'Sonic Adventure 2', 2001, 'A 3D platformer featuring multiple character storylines.'),
    (40, 'Skies of Arcadia', 2000, 'A traditional JRPG involving airship pirates.'),
    (41, 'Grand Theft Auto V', 2013, 'An expansive open-world crime action game.'),
    (42, 'The Witcher 3: Wild Hunt', 2015, 'A deep, narrative-driven fantasy RPG.'),
    (43, 'Red Dead Redemption 2', 2018, 'A highly detailed wild west action-adventure game.'),
    (44, 'Cyberpunk 2077', 2020, 'A dystopian sci-fi open-world RPG.'),
    (45, 'Elden Ring', 2022, 'A challenging open-world fantasy action-RPG.'),
    (46, 'Resident Evil 4 Remake', 2023, 'A modernized classic survival horror game.'),
    (47, 'Baldur''s Gate 3', 2023, 'An isometric RPG based on Dungeons & Dragons rules.'),
    (48, 'Call of Duty: Modern Warfare II', 2022, 'A blockbuster military first-person shooter.'),
    (49, 'FIFA 23', 2022, 'A realistic professional soccer simulation game.'),
    (50, 'Minecraft', 2011, 'A sandbox survival and building game made of blocks.'),
    (51, 'Hollow Knight', 2017, 'A challenging 2D metroidvania set in a ruined bug kingdom.'),
    (52, 'Stardew Valley', 2016, 'A relaxing farming simulation and RPG.'),
    (53, 'Celeste', 2018, 'A challenging precision platformer with a touching story.'),
    (54, 'Hades', 2020, 'An action roguelike about escaping the Greek underworld.'),
    (55, 'Undertale', 2015, 'A unique RPG where nobody has to die.'),
    (56, 'Terraria', 2011, 'A 2D sandbox action-adventure game.'),
    (57, 'Rocket League', 2015, 'A high-octane vehicular soccer game.'),
    (58, 'Among Us', 2018, 'A multiplayer game of teamwork and betrayal.'),
    (59, 'Fall Guys', 2020, 'A massive multiplayer party knockout game.'),
    (60, 'Cuphead', 2017, 'A punishing run-and-gun action game with 1930s animation.'),
    (61, 'Chrono Trigger', 1995, 'A legendary time-traveling 16-bit RPG.'),
    (62, 'Persona 5 Royal', 2019, 'A stylish JRPG blending dungeon crawling and social simulation.'),
    (63, 'Dragon Quest XI', 2017, 'A classic turn-based JRPG with modern visuals.'),
    (64, 'Nier: Automata', 2017, 'An action-RPG exploring philosophy through androids.'),
    (65, 'Xenoblade Chronicles', 2010, 'A massive RPG set on the backs of dormant titans.'),
    (66, 'EarthBound', 1994, 'A quirky modern-day RPG.'),
    (67, 'Fire Emblem: Three Houses', 2019, 'A tactical role-playing game with social elements.'),
    (68, 'Pokemon Sword', 2019, 'A monster-catching adventure set in the Galar region.'),
    (69, 'Kingdom Hearts', 2002, 'An action-RPG crossing over Final Fantasy and Disney.'),
    (70, 'Dark Souls', 2011, 'A highly influential and challenging action-RPG.'),
    (71, 'Civilization VI', 2016, 'A turn-based strategy game about building an empire.'),
    (72, 'XCOM 2', 2016, 'A tactical turn-based strategy game fighting an alien occupation.'),
    (73, 'The Sims 4', 2014, 'The popular virtual life simulation game.'),
    (74, 'Cities: Skylines', 2015, 'A deep and complex city-building simulation.'),
    (75, 'Age of Empires II', 1999, 'A classic historical real-time strategy game.'),
    (76, 'StarCraft', 1998, 'A definitive sci-fi real-time strategy game.'),
    (77, 'RollerCoaster Tycoon', 1999, 'A theme park management simulation game.'),
    (78, 'Animal Crossing: New Horizons', 2020, 'A deserted island life simulation game.'),
    (79, 'Microsoft Flight Simulator', 2020, 'A highly realistic global flight simulation.'),
    (80, 'Euro Truck Simulator 2', 2012, 'A relaxing truck driving and logistics simulation.'),
    (81, 'Street Fighter II', 1991, 'The fighting game that defined the genre.'),
    (82, 'Mortal Kombat 11', 2019, 'A brutal and cinematic 2D fighting game.'),
    (83, 'Tekken 7', 2015, 'A highly technical 3D fighting game.'),
    (84, 'Super Smash Bros. Ultimate', 2018, 'The biggest crossover fighting game ever created.'),
    (85, 'Devil May Cry 5', 2019, 'A stylish action hack-and-slash game.'),
    (86, 'Bayonetta', 2009, 'An over-the-top action game featuring an umbra witch.'),
    (87, 'Sekiro: Shadows Die Twice', 2019, 'A punishing action game demanding precise parries.'),
    (88, 'Batman: Arkham City', 2011, 'An open-world action game featuring the Dark Knight.'),
    (89, 'Marvel''s Spider-Man', 2018, 'An open-world action-adventure game swinging through NYC.'),
    (90, 'Control', 2019, 'A mind-bending supernatural action-adventure game.'),
    (91, 'Tetris', 1984, 'The iconic falling block puzzle game.'),
    (92, 'Pac-Man', 1980, 'The classic maze arcade game.'),
    (93, 'Portal 2', 2011, 'A brilliant cooperative physics puzzle game.'),
    (94, 'The Witness', 2016, 'A complex open-world puzzle game.'),
    (95, 'Mario Kart 8 Deluxe', 2017, 'The definitive anti-gravity kart racing game.'),
    (96, 'Gran Turismo 7', 2022, 'A realistic driving and racing simulator.'),
    (97, 'Need for Speed Underground 2', 2004, 'An open-world street racing and tuning game.'),
    (98, 'Burnout 3: Takedown', 2004, 'A high-speed arcade racing game focused on crashing.'),
    (99, 'It Takes Two', 2021, 'A cooperative action-adventure platforming game.'),
    (100, 'Overcooked! 2', 2018, 'A chaotic cooperative cooking puzzle game.');

-- Insert Relationships: Game Platforms
-- Platform IDs Reference: 1:Windows, 3:GB, 6:N64, 7:GameCube, 8:Wii, 10:Switch, 11:PS1, 12:PS2, 13:PS3, 14:PS4, 15:PS5, 16:Xbox, 17:360, 18:Xbox One, 19:XSX, 25:Genesis, 27:Dreamcast
INSERT INTO game_platforms (game_id, platform_id) VALUES
    (1, 6), (2, 6), (3, 3), (4, 7), (5, 7), (6, 7), (7, 8), (8, 8), (9, 9), (9, 10), 
    (10, 10), (11, 11), (12, 11), (13, 11), (14, 12), (15, 12), (16, 13), (17, 13), (18, 14), (19, 14), 
    (20, 14), (21, 16), (22, 17), (23, 16), (24, 1), (25, 1), (26, 17), (26, 13), (27, 1), (27, 17), 
    (28, 1), (28, 17), (29, 1), (29, 14), (30, 1), (30, 18), (31, 25), (32, 25), (33, 25), (34, 26), 
    (35, 26), (36, 27), (37, 27), (38, 27), (39, 27), (40, 27), (41, 1), (41, 14), (41, 18), (42, 1), 
    (42, 14), (43, 14), (43, 18), (44, 1), (44, 15), (45, 1), (45, 15), (46, 1), (46, 15), (47, 1), 
    (47, 15), (48, 1), (48, 15), (49, 14), (49, 15), (50, 1), (50, 10), (51, 1), (51, 10), (52, 1), 
    (52, 10), (53, 1), (53, 10), (54, 1), (54, 10), (55, 1), (56, 1), (57, 1), (57, 14), (58, 1), 
    (58, 2), (59, 1), (59, 14), (60, 1), (60, 18), (61, 11), (62, 14), (63, 14), (63, 10), (64, 1), 
    (64, 14), (65, 8), (66, 10), (67, 10), (68, 10), (69, 12), (70, 1), (70, 13), (71, 1), (72, 1), 
    (73, 1), (74, 1), (75, 1), (76, 1), (77, 1), (78, 10), (79, 1), (79, 19), (80, 1), (81, 25), 
    (82, 1), (82, 14), (83, 1), (83, 14), (84, 10), (85, 1), (85, 14), (86, 13), (86, 17), (87, 1), 
    (87, 14), (88, 1), (88, 13), (89, 14), (90, 1), (90, 14), (91, 3), (92, 1), (93, 1), (93, 13), 
    (94, 1), (94, 14), (95, 10), (96, 14), (96, 15), (97, 12), (97, 16), (98, 12), (98, 16), (99, 1), 
    (99, 15), (100, 1), (100, 10);

-- Insert Relationships: Game Tags
-- Tag IDs Reference: 1:Action, 2:Action Adv, 3:Adventure, 4:Hardware, 5:Misc, 6:Puzzle, 7:Racing, 8:RPG, 9:Simulation, 10:Sports, 11:Strategy
INSERT INTO game_tags (game_id, tag_id) VALUES
    (1, 1), (2, 2), (3, 8), (4, 1), (5, 2), (6, 9), (7, 7), (8, 10), (9, 2), (10, 1),
    (11, 8), (12, 1), (13, 1), (14, 1), (15, 2), (16, 2), (17, 2), (18, 8), (19, 2), (20, 2),
    (21, 1), (22, 1), (23, 8), (24, 1), (25, 6), (26, 8), (27, 8), (28, 8), (29, 1), (30, 7),
    (31, 1), (32, 1), (33, 8), (34, 1), (35, 8), (36, 3), (37, 7), (38, 1), (39, 1), (40, 8),
    (41, 2), (42, 8), (43, 2), (44, 8), (45, 8), (46, 2), (47, 8), (48, 1), (49, 10), (50, 9),
    (51, 2), (52, 9), (53, 1), (54, 1), (55, 8), (56, 3), (57, 10), (58, 5), (59, 5), (60, 1),
    (61, 8), (62, 8), (63, 8), (64, 8), (65, 8), (66, 8), (67, 11), (67, 8), (68, 8), (69, 8),
    (70, 8), (71, 11), (72, 11), (73, 9), (74, 9), (75, 11), (76, 11), (77, 9), (78, 9), (79, 9),
    (80, 9), (81, 1), (82, 1), (83, 1), (84, 1), (85, 1), (86, 1), (87, 1), (88, 2), (89, 2),
    (90, 2), (91, 6), (92, 1), (93, 6), (94, 6), (95, 7), (96, 7), (97, 7), (98, 7), (99, 2), (100, 6);