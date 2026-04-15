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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string
          department: string | null
          display_name: string | null
          id: string
          permissions: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          display_name?: string | null
          id?: string
          permissions?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          display_name?: string | null
          id?: string
          permissions?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_registrations: {
        Row: {
          business_type: string | null
          city: string
          country: string
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          registration_type: string
          status: string
          updated_at: string
        }
        Insert: {
          business_type?: string | null
          city: string
          country: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          registration_type?: string
          status?: string
          updated_at?: string
        }
        Update: {
          business_type?: string | null
          city?: string
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          registration_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          email: string
          event_id: string
          full_name: string
          id: string
          message: string | null
          organization: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          event_id: string
          full_name: string
          id?: string
          message?: string | null
          organization?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          event_id?: string
          full_name?: string
          id?: string
          message?: string | null
          organization?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          active: boolean | null
          attendees: string | null
          category: string | null
          created_at: string | null
          description: string
          display_order: number | null
          event_date: string
          event_time: string | null
          id: string
          image_url: string | null
          impact: string | null
          location: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          attendees?: string | null
          category?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          event_date: string
          event_time?: string | null
          id?: string
          image_url?: string | null
          impact?: string | null
          location?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          attendees?: string | null
          category?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          event_date?: string
          event_time?: string | null
          id?: string
          image_url?: string | null
          impact?: string | null
          location?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      org_departments: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          head_staff_id: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          head_staff_id?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          head_staff_id?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_head_staff"
            columns: ["head_staff_id"]
            isOneToOne: false
            referencedRelation: "org_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      org_projects: {
        Row: {
          budget: number | null
          created_at: string
          department_id: string | null
          description: string | null
          end_date: string | null
          id: string
          priority: string
          progress: number | null
          project_lead_id: string | null
          start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          department_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string
          progress?: number | null
          project_lead_id?: string | null
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          department_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string
          progress?: number | null
          project_lead_id?: string | null
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_projects_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_projects_project_lead_id_fkey"
            columns: ["project_lead_id"]
            isOneToOne: false
            referencedRelation: "org_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      org_staff: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          department_id: string | null
          email: string
          employment_type: string
          first_name: string
          hire_date: string | null
          id: string
          last_name: string
          phone: string | null
          position: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department_id?: string | null
          email: string
          employment_type?: string
          first_name: string
          hire_date?: string | null
          id?: string
          last_name: string
          phone?: string | null
          position: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department_id?: string | null
          email?: string
          employment_type?: string
          first_name?: string
          hire_date?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          position?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_staff_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string
          display_order: number | null
          icon: string | null
          id: string
          image_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_tasks: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          created_at: string
          description: string | null
          display_order: number | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          priority: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "org_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      success_metrics: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          display_order: number | null
          icon: string | null
          id: string
          metric_name: string
          metric_value: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          metric_name: string
          metric_value: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          metric_name?: string
          metric_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string
          display_order: number | null
          id: string
          image_url: string | null
          title: string
          updated_at: string | null
          view_count: number
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string | null
          view_count?: number
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number
        }
        Relationships: []
      }
      team_members: {
        Row: {
          active: boolean | null
          bio: string
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string | null
          name: string
          position: string
          role: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          bio: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name: string
          position: string
          role: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          bio?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name?: string
          position?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          active: boolean | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string | null
          name: string
          quote: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name: string
          quote: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name?: string
          quote?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      volunteer_activities: {
        Row: {
          activity_date: string
          activity_type: string
          created_at: string
          description: string | null
          hours_contributed: number | null
          id: string
          location: string | null
          notes: string | null
          project_name: string | null
          status: string | null
          updated_at: string
          volunteer_id: string
        }
        Insert: {
          activity_date: string
          activity_type: string
          created_at?: string
          description?: string | null
          hours_contributed?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          project_name?: string | null
          status?: string | null
          updated_at?: string
          volunteer_id: string
        }
        Update: {
          activity_date?: string
          activity_type?: string
          created_at?: string
          description?: string | null
          hours_contributed?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          project_name?: string | null
          status?: string | null
          updated_at?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_activities_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_hours: {
        Row: {
          activity_date: string
          activity_type: string
          created_at: string
          description: string | null
          hours: number
          id: string
          location: string | null
          updated_at: string
          verified: boolean | null
          verified_by: string | null
          volunteer_id: string
        }
        Insert: {
          activity_date: string
          activity_type: string
          created_at?: string
          description?: string | null
          hours: number
          id?: string
          location?: string | null
          updated_at?: string
          verified?: boolean | null
          verified_by?: string | null
          volunteer_id: string
        }
        Update: {
          activity_date?: string
          activity_type?: string
          created_at?: string
          description?: string | null
          hours?: number
          id?: string
          location?: string | null
          updated_at?: string
          verified?: boolean | null
          verified_by?: string | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_hours_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_profiles: {
        Row: {
          age: number | null
          availability: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          education: string | null
          email: string
          emergency_contact: string | null
          emergency_phone: string | null
          experience: string | null
          first_name: string
          id: string
          join_date: string | null
          languages: string | null
          last_name: string
          motivation: string | null
          occupation: string | null
          phone: string | null
          skills: string | null
          status: string | null
          updated_at: string
          user_id: string
          volunteer_area: string | null
          volunteer_id: string | null
        }
        Insert: {
          age?: number | null
          availability?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          education?: string | null
          email: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          experience?: string | null
          first_name: string
          id?: string
          join_date?: string | null
          languages?: string | null
          last_name: string
          motivation?: string | null
          occupation?: string | null
          phone?: string | null
          skills?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          volunteer_area?: string | null
          volunteer_id?: string | null
        }
        Update: {
          age?: number | null
          availability?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          education?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          experience?: string | null
          first_name?: string
          id?: string
          join_date?: string | null
          languages?: string | null
          last_name?: string
          motivation?: string | null
          occupation?: string | null
          phone?: string | null
          skills?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          volunteer_area?: string | null
          volunteer_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_story_view_count: {
        Args: { story_id: string }
        Returns: undefined
      }
      promote_self_to_admin: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "volunteer" | "user"
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
      app_role: ["admin", "volunteer", "user"],
    },
  },
} as const
