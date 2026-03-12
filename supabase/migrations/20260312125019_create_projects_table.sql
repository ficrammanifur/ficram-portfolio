/*
  # Create Projects Table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `tags` (text[])
      - `image_url` (text, optional)
      - `github_link` (text)
      - `demo_link` (text, optional)
      - `featured` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Public read access - anyone can view projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL,
  image_url text,
  github_link text NOT NULL,
  demo_link text,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view all projects"
  ON projects FOR SELECT
  USING (true);
