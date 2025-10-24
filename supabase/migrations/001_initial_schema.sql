-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create photos table
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    width INTEGER,
    height INTEGER,
    camera_model VARCHAR(100),
    lens VARCHAR(100),
    focal_length VARCHAR(50),
    aperture VARCHAR(20),
    shutter_speed VARCHAR(50),
    iso INTEGER,
    taken_at TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create photo_categories junction table
CREATE TABLE photo_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    photo_id UUID NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(photo_id, category_id)
);

-- Create photo_quotes table for inspirational quotes
CREATE TABLE photo_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    photo_id UUID NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
    quote TEXT NOT NULL,
    author VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create photo_media table for additional media files
CREATE TABLE photo_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    photo_id UUID NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
    file_path VARCHAR(500) NOT NULL,
    media_type VARCHAR(50) NOT NULL, -- 'thumbnail', 'medium', 'large', 'original'
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_photos_is_featured ON photos(is_featured);
CREATE INDEX idx_photos_is_published ON photos(is_published);
CREATE INDEX idx_photos_sort_order ON photos(sort_order);
CREATE INDEX idx_photos_created_at ON photos(created_at);
CREATE INDEX idx_photo_categories_photo_id ON photo_categories(photo_id);
CREATE INDEX idx_photo_categories_category_id ON photo_categories(category_id);
CREATE INDEX idx_photo_quotes_photo_id ON photo_quotes(photo_id);
CREATE INDEX idx_photo_media_photo_id ON photo_media(photo_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_media ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to published photos" ON photos
    FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read access to photo_categories" ON photo_categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to photo_quotes" ON photo_quotes
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to photo_media" ON photo_media
    FOR SELECT USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON categories TO anon;
GRANT SELECT ON photos TO anon;
GRANT SELECT ON photo_categories TO anon;
GRANT SELECT ON photo_quotes TO anon;
GRANT SELECT ON photo_media TO anon;

GRANT ALL PRIVILEGES ON categories TO authenticated;
GRANT ALL PRIVILEGES ON photos TO authenticated;
GRANT ALL PRIVILEGES ON photo_categories TO authenticated;
GRANT ALL PRIVILEGES ON photo_quotes TO authenticated;
GRANT ALL PRIVILEGES ON photo_media TO authenticated;

-- Insert some default categories
INSERT INTO categories (name, description, slug) VALUES
('Appetizers', 'Delicious starters and small plates', 'appetizers'),
('Main Course', 'Hearty main dishes and entrees', 'main-course'),
('Desserts', 'Sweet treats and desserts', 'desserts'),
('Beverages', 'Drinks and cocktails', 'beverages'),
('Special Events', 'Food photography from special events', 'special-events');