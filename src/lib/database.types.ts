export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      seeds: {
        Row: {
          id: string
          seed_code: string
          title: string
          description: string
          version: string
          edition: string
          biomes: string[]
          features: string[]
          image_url: string | null
          views: number
          created_at: string
        }
        Insert: {
          id?: string
          seed_code: string
          title: string
          description?: string
          version?: string
          edition?: string
          biomes?: string[]
          features?: string[]
          image_url?: string | null
          views?: number
          created_at?: string
        }
        Update: {
          id?: string
          seed_code?: string
          title?: string
          description?: string
          version?: string
          edition?: string
          biomes?: string[]
          features?: string[]
          image_url?: string | null
          views?: number
          created_at?: string
        }
      }
    }
  }
}

export type Seed = Database['public']['Tables']['seeds']['Row'];
