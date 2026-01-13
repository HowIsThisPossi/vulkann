/*
  # Add Edition Field to Seeds Table
  
  Adds support for tracking Minecraft edition (Java & Bedrock, Java only, or Bedrock only)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'seeds' AND column_name = 'edition'
  ) THEN
    ALTER TABLE seeds ADD COLUMN edition text DEFAULT 'Java & Bedrock';
  END IF;
END $$;