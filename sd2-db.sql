-- Create Platforms Table
CREATE TABLE IF NOT EXISTS platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Tags Table
CREATE TABLE IF NOT EXISTS tags (
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
    ('Sega 32X'),


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
    ('Strategy')