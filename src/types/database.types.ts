// Generated with ```illiazolotukha@MacBook-Air-Illia-2 ad-studio % npx supabase gen types typescript --project-id "hfdfggwxdvdykpeaxguf" --schema public,stripe > database.types.ts``

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)'
  }
  public: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_marketing_assets: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Tables: {
      businesses: {
        Insert: {
          category?: null | string
          channels?: null | string[]
          created_at?: string
          customer?: Json | null
          id?: number
          language?: null | string
          location?: Json | null
          name?: null | string
          promotions?: null | string[]
          regions?: null | string[]
          tone?: null | string
          type?: null | string
          user_id?: null | string
          visuals?: null | string[]
        }
        Relationships: []
        Row: {
          category: null | string
          channels: null | string[]
          created_at: string
          customer: Json | null
          id: number
          language: null | string
          location: Json | null
          name: null | string
          promotions: null | string[]
          regions: null | string[]
          tone: null | string
          type: null | string
          user_id: null | string
          visuals: null | string[]
        }
        Update: {
          category?: null | string
          channels?: null | string[]
          created_at?: string
          customer?: Json | null
          id?: number
          language?: null | string
          location?: Json | null
          name?: null | string
          promotions?: null | string[]
          regions?: null | string[]
          tone?: null | string
          type?: null | string
          user_id?: null | string
          visuals?: null | string[]
        }
      }
      campaigns: {
        Insert: {
          approach?: null | string
          channels?: null | string[]
          created_at?: string
          goal?: null | string
          id?: number
          promotion?: null | string
          temperature?: null | string
          tone?: null | string
          user_id?: null | string
        }
        Relationships: []
        Row: {
          approach: null | string
          channels: null | string[]
          created_at: string
          goal: null | string
          id: number
          promotion: null | string
          temperature: null | string
          tone: null | string
          user_id: null | string
        }
        Update: {
          approach?: null | string
          channels?: null | string[]
          created_at?: string
          goal?: null | string
          id?: number
          promotion?: null | string
          temperature?: null | string
          tone?: null | string
          user_id?: null | string
        }
      }
      contents: {
        Insert: {
          business_id: number
          campaign_id: number
        }
        Relationships: [
          {
            columns: ['business_id']
            foreignKeyName: 'contents_business_id_fkey'
            isOneToOne: false
            referencedColumns: ['id']
            referencedRelation: 'businesses'
          },
          {
            columns: ['campaign_id']
            foreignKeyName: 'contents_campaign_id_fkey'
            isOneToOne: false
            referencedColumns: ['id']
            referencedRelation: 'campaigns'
          }
        ]
        Row: {
          business_id: number
          campaign_id: number
        }
        Update: {
          business_id?: number
          campaign_id?: number
        }
      }
      generated_ads: {
        Insert: {
          ad_text?: null | string
          business_details?: Json | null
          business_id?: null | number
          campaign_details?: Json | null
          campaign_id?: null | number
          created_at?: null | string
          generation_model?: null | string
          id?: never
          image_url?: null | string
          user_id?: null | string
        }
        Relationships: [
          {
            columns: ['business_id']
            foreignKeyName: 'generated_ads_business_id_fkey'
            isOneToOne: false
            referencedColumns: ['id']
            referencedRelation: 'businesses'
          },
          {
            columns: ['campaign_id']
            foreignKeyName: 'generated_ads_campaign_id_fkey'
            isOneToOne: false
            referencedColumns: ['id']
            referencedRelation: 'campaigns'
          }
        ]
        Row: {
          ad_text: null | string
          business_details: Json | null
          business_id: null | number
          campaign_details: Json | null
          campaign_id: null | number
          created_at: null | string
          generation_model: null | string
          id: number
          image_url: null | string
          user_id: null | string
        }
        Update: {
          ad_text?: null | string
          business_details?: Json | null
          business_id?: null | number
          campaign_details?: Json | null
          campaign_id?: null | number
          created_at?: null | string
          generation_model?: null | string
          id?: never
          image_url?: null | string
          user_id?: null | string
        }
      }
      users: {
        Insert: {
          aud?: null | string
          banned_until?: null | string
          confirmation_sent_at?: null | string
          confirmation_token?: null | string
          confirmed_at?: null | string
          created_at?: null | string
          deleted_at?: null | string
          email?: null | string
          email_change?: null | string
          email_change_confirm_status?: null | number
          email_change_sent_at?: null | string
          email_change_token_current?: null | string
          email_change_token_new?: null | string
          email_confirmed_at?: null | string
          encrypted_password?: null | string
          id: string
          invited_at?: null | string
          is_anonymous?: boolean | null
          is_sso_user?: boolean | null
          is_super_admin?: boolean | null
          last_sign_in_at?: null | string
          phone?: null | string
          phone_change?: null | string
          phone_change_sent_at?: null | string
          phone_change_token?: null | string
          phone_confirmed_at?: null | string
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: null | string
          reauthentication_token?: null | string
          recovery_sent_at?: null | string
          recovery_token?: null | string
          role?: null | string
          updated_at?: null | string
        }
        Relationships: []
        Row: {
          aud: null | string
          banned_until: null | string
          confirmation_sent_at: null | string
          confirmation_token: null | string
          confirmed_at: null | string
          created_at: null | string
          deleted_at: null | string
          email: null | string
          email_change: null | string
          email_change_confirm_status: null | number
          email_change_sent_at: null | string
          email_change_token_current: null | string
          email_change_token_new: null | string
          email_confirmed_at: null | string
          encrypted_password: null | string
          id: string
          invited_at: null | string
          is_anonymous: boolean | null
          is_sso_user: boolean | null
          is_super_admin: boolean | null
          last_sign_in_at: null | string
          phone: null | string
          phone_change: null | string
          phone_change_sent_at: null | string
          phone_change_token: null | string
          phone_confirmed_at: null | string
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: null | string
          reauthentication_token: null | string
          recovery_sent_at: null | string
          recovery_token: null | string
          role: null | string
          updated_at: null | string
        }
        Update: {
          aud?: null | string
          banned_until?: null | string
          confirmation_sent_at?: null | string
          confirmation_token?: null | string
          confirmed_at?: null | string
          created_at?: null | string
          deleted_at?: null | string
          email?: null | string
          email_change?: null | string
          email_change_confirm_status?: null | number
          email_change_sent_at?: null | string
          email_change_token_current?: null | string
          email_change_token_new?: null | string
          email_confirmed_at?: null | string
          encrypted_password?: null | string
          id?: string
          invited_at?: null | string
          is_anonymous?: boolean | null
          is_sso_user?: boolean | null
          is_super_admin?: boolean | null
          last_sign_in_at?: null | string
          phone?: null | string
          phone_change?: null | string
          phone_change_sent_at?: null | string
          phone_change_token?: null | string
          phone_confirmed_at?: null | string
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: null | string
          reauthentication_token?: null | string
          recovery_sent_at?: null | string
          recovery_token?: null | string
          role?: null | string
          updated_at?: null | string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
  }
  stripe: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Tables: {
      customers: {
        Insert: {
          attrs?: Json | null
          created?: null | string
          description?: null | string
          email?: null | string
          id?: null | string
          name?: null | string
        }
        Relationships: []
        Row: {
          attrs: Json | null
          created: null | string
          description: null | string
          email: null | string
          id: null | string
          name: null | string
        }
        Update: {
          attrs?: Json | null
          created?: null | string
          description?: null | string
          email?: null | string
          id?: null | string
          name?: null | string
        }
      }
      prices: {
        Insert: {
          active?: boolean | null
          attrs?: Json | null
          created?: null | string
          currency?: null | string
          id?: null | string
          product?: null | string
          type?: null | string
          unit_amount?: null | number
        }
        Relationships: []
        Row: {
          active: boolean | null
          attrs: Json | null
          created: null | string
          currency: null | string
          id: null | string
          product: null | string
          type: null | string
          unit_amount: null | number
        }
        Update: {
          active?: boolean | null
          attrs?: Json | null
          created?: null | string
          currency?: null | string
          id?: null | string
          product?: null | string
          type?: null | string
          unit_amount?: null | number
        }
      }
      products: {
        Insert: {
          active?: boolean | null
          attrs?: Json | null
          created?: null | string
          default_price?: null | string
          description?: null | string
          id?: null | string
          name?: null | string
          updated?: null | string
        }
        Relationships: []
        Row: {
          active: boolean | null
          attrs: Json | null
          created: null | string
          default_price: null | string
          description: null | string
          id: null | string
          name: null | string
          updated: null | string
        }
        Update: {
          active?: boolean | null
          attrs?: Json | null
          created?: null | string
          default_price?: null | string
          description?: null | string
          id?: null | string
          name?: null | string
          updated?: null | string
        }
      }
      subscriptions: {
        Insert: {
          attrs?: Json | null
          currency?: null | string
          current_period_end?: null | string
          current_period_start?: null | string
          customer?: null | string
          id?: null | string
        }
        Relationships: []
        Row: {
          attrs: Json | null
          currency: null | string
          current_period_end: null | string
          current_period_start: null | string
          customer: null | string
          id: null | string
        }
        Update: {
          attrs?: Json | null
          currency?: null | string
          current_period_end?: null | string
          current_period_start?: null | string
          customer?: null | string
          id?: null | string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
  }
}

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type Json = boolean | Json[] | null | number | string | { [key: string]: Json | undefined }

export type Tables<
  DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views']) | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export const Constants = {
  public: {
    Enums: {}
  },
  stripe: {
    Enums: {}
  }
} as const
