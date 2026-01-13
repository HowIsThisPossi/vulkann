/*
  # Create Minecraft Seeds Database

  1. New Tables
    - `seeds`
      - `id` (uuid, primary key) - Unique identifier for each seed
      - `seed_code` (text, not null) - The actual Minecraft seed code
      - `title` (text, not null) - Title/name of the seed
      - `description` (text) - Detailed description of what makes this seed special
      - `version` (text) - Minecraft version (e.g., "1.20.1", "1.19.4")
      - `biomes` (text array) - Array of biomes found in this seed
      - `features` (text array) - Special features (villages, temples, strongholds, etc.)
      - `image_url` (text) - URL to screenshot of the seed
      - `views` (integer, default 0) - Number of times this seed has been viewed
      - `created_at` (timestamptz) - When the seed was added
      
  2. Security
    - Enable RLS on `seeds` table
    - Add policy for anyone to read seeds (public website)
    - Authenticated users can insert seeds (for future admin functionality)
*/

CREATE TABLE IF NOT EXISTS seeds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seed_code text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  version text DEFAULT '1.20.1',
  biomes text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  image_url text,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE seeds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view seeds"
  ON seeds FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert seeds"
  ON seeds FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_seeds_created_at ON seeds(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seeds_views ON seeds(views DESC);