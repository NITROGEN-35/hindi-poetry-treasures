export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      poem_likes: {
        Row: {
          created_at: string
          id: string
          poem_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          poem_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          poem_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poem_likes_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["id"]
          },
        ]
      }
      poems: {
        Row: {
          category: Database["public"]["Enums"]["poem_category"]
          content: string
          content_hindi: string | null
          created_at: string
          display_order: number | null
          excerpt: string | null
          id: string
          is_editor_pick: boolean
          is_featured: boolean
          is_poem_of_day: boolean
          likes: number
          poet_id: string | null
          title: string
          title_hindi: string | null
          updated_at: string
          views: number
        }
        Insert: {
          category?: Database["public"]["Enums"]["poem_category"]
          content: string
          content_hindi?: string | null
          created_at?: string
          display_order?: number | null
          excerpt?: string | null
          id?: string
          is_editor_pick?: boolean
          is_featured?: boolean
          is_poem_of_day?: boolean
          likes?: number
          poet_id?: string | null
          title: string
          title_hindi?: string | null
          updated_at?: string
          views?: number
        }
        Update: {
          category?: Database["public"]["Enums"]["poem_category"]
          content?: string
          content_hindi?: string | null
          created_at?: string
          display_order?: number | null
          excerpt?: string | null
          id?: string
          is_editor_pick?: boolean
          is_featured?: boolean
          is_poem_of_day?: boolean
          likes?: number
          poet_id?: string | null
          title?: string
          title_hindi?: string | null
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "poems_poet_id_fkey"
            columns: ["poet_id"]
            isOneToOne: false
            referencedRelation: "poets"
            referencedColumns: ["id"]
          },
        ]
      }
      poets: {
        Row: {
          bio: string | null
          bio_hindi: string | null
          birth_year: number | null
          created_at: string
          death_year: number | null
          id: string
          image_url: string | null
          name: string
          name_hindi: string | null
        }
        Insert: {
          bio?: string | null
          bio_hindi?: string | null
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          id?: string
          image_url?: string | null
          name: string
          name_hindi?: string | null
        }
        Update: {
          bio?: string | null
          bio_hindi?: string | null
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          id?: string
          image_url?: string | null
          name?: string
          name_hindi?: string | null
        }
        Relationships: []
      }
      reading_history: {
        Row: {
          id: string
          poem_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          id?: string
          poem_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          id?: string
          poem_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_history_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_poems: {
        Row: {
          created_at: string
          id: string
          poem_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          poem_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          poem_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_poems_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      poem_category:
        | "Love"
        | "Nature"
        | "Life"
        | "Friendship"
        | "Spirituality"
        | "Patriotic"
        | "Romance"
        | "Philosophy"
        | "Social"
        | "Modern"
        | "Inspiration"
        | "Empowerment"
        | "Poetry"
        | "Classic"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      poem_category: [
        "Love",
        "Nature",
        "Life",
        "Friendship",
        "Spirituality",
        "Patriotic",
        "Romance",
        "Philosophy",
        "Social",
        "Modern",
        "Inspiration",
        "Empowerment",
        "Poetry",
        "Classic",
      ],
    },
  },
} as const
