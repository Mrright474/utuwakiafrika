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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
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
          unsubscribe_token: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string
          subscribed_at?: string
          unsubscribe_token?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
          unsubscribe_token?: string
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
      unp_assets: {
        Row: {
          asset_tag: string | null
          category: string | null
          condition: string | null
          created_at: string
          currency: string | null
          custodian_id: string | null
          department_id: string | null
          id: string
          location: string | null
          name: string
          notes: string | null
          purchase_cost: number | null
          purchase_date: string | null
          status: string
          updated_at: string
          warranty_expiry: string | null
        }
        Insert: {
          asset_tag?: string | null
          category?: string | null
          condition?: string | null
          created_at?: string
          currency?: string | null
          custodian_id?: string | null
          department_id?: string | null
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          purchase_cost?: number | null
          purchase_date?: string | null
          status?: string
          updated_at?: string
          warranty_expiry?: string | null
        }
        Update: {
          asset_tag?: string | null
          category?: string | null
          condition?: string | null
          created_at?: string
          currency?: string | null
          custodian_id?: string | null
          department_id?: string | null
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          purchase_cost?: number | null
          purchase_date?: string | null
          status?: string
          updated_at?: string
          warranty_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unp_assets_custodian_id_fkey"
            columns: ["custodian_id"]
            isOneToOne: false
            referencedRelation: "org_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_assets_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_audit_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_name: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json
          module_id: string | null
          module_label: string | null
          record_id: string | null
          record_label: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          module_id?: string | null
          module_label?: string | null
          record_id?: string | null
          record_label?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          module_id?: string | null
          module_label?: string | null
          record_id?: string | null
          record_label?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      unp_beneficiaries: {
        Row: {
          beneficiary_code: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          district: string | null
          full_name: string
          gender: string | null
          household_head: string | null
          household_size: number | null
          id: string
          latitude: number | null
          longitude: number | null
          national_id: string | null
          notes: string | null
          phone: string | null
          photo_url: string | null
          programme: string | null
          status: string
          updated_at: string
          village: string | null
        }
        Insert: {
          beneficiary_code?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          district?: string | null
          full_name: string
          gender?: string | null
          household_head?: string | null
          household_size?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          national_id?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          programme?: string | null
          status?: string
          updated_at?: string
          village?: string | null
        }
        Update: {
          beneficiary_code?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          district?: string | null
          full_name?: string
          gender?: string | null
          household_head?: string | null
          household_size?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          national_id?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          programme?: string | null
          status?: string
          updated_at?: string
          village?: string | null
        }
        Relationships: []
      }
      unp_cases: {
        Row: {
          action_taken: string | null
          assigned_to: string | null
          beneficiary_id: string | null
          case_number: string | null
          case_type: string
          closed_date: string | null
          created_at: string
          department_id: string | null
          id: string
          opened_date: string | null
          priority: string
          referral: string | null
          status: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          action_taken?: string | null
          assigned_to?: string | null
          beneficiary_id?: string | null
          case_number?: string | null
          case_type?: string
          closed_date?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          opened_date?: string | null
          priority?: string
          referral?: string | null
          status?: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          action_taken?: string | null
          assigned_to?: string | null
          beneficiary_id?: string | null
          case_number?: string | null
          case_type?: string
          closed_date?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          opened_date?: string | null
          priority?: string
          referral?: string | null
          status?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_cases_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "org_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_cases_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "unp_beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_cases_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_community_activities: {
        Row: {
          activity_date: string
          activity_type: string
          created_at: string
          district: string | null
          facilitator: string | null
          group_name: string | null
          id: string
          outcomes: string | null
          participants_female: number | null
          participants_total: number | null
          participants_youth: number | null
          photo_url: string | null
          project_id: string | null
          title: string
          updated_at: string
          village: string | null
        }
        Insert: {
          activity_date?: string
          activity_type?: string
          created_at?: string
          district?: string | null
          facilitator?: string | null
          group_name?: string | null
          id?: string
          outcomes?: string | null
          participants_female?: number | null
          participants_total?: number | null
          participants_youth?: number | null
          photo_url?: string | null
          project_id?: string | null
          title: string
          updated_at?: string
          village?: string | null
        }
        Update: {
          activity_date?: string
          activity_type?: string
          created_at?: string
          district?: string | null
          facilitator?: string | null
          group_name?: string | null
          id?: string
          outcomes?: string | null
          participants_female?: number | null
          participants_total?: number | null
          participants_youth?: number | null
          photo_url?: string | null
          project_id?: string | null
          title?: string
          updated_at?: string
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unp_community_activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_documents: {
        Row: {
          confidentiality: string | null
          created_at: string
          department_id: string | null
          description: string | null
          doc_type: string | null
          file_url: string | null
          id: string
          owner: string | null
          project_id: string | null
          review_date: string | null
          status: string
          title: string
          updated_at: string
          version: string | null
        }
        Insert: {
          confidentiality?: string | null
          created_at?: string
          department_id?: string | null
          description?: string | null
          doc_type?: string | null
          file_url?: string | null
          id?: string
          owner?: string | null
          project_id?: string | null
          review_date?: string | null
          status?: string
          title: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          confidentiality?: string | null
          created_at?: string
          department_id?: string | null
          description?: string | null
          doc_type?: string | null
          file_url?: string | null
          id?: string
          owner?: string | null
          project_id?: string | null
          review_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unp_documents_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_donors: {
        Row: {
          contact_person: string | null
          country: string | null
          created_at: string
          currency: string | null
          donor_type: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          relationship_status: string
          total_funded: number | null
          updated_at: string
        }
        Insert: {
          contact_person?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          donor_type?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          relationship_status?: string
          total_funded?: number | null
          updated_at?: string
        }
        Update: {
          contact_person?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          donor_type?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          relationship_status?: string
          total_funded?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      unp_field_reports: {
        Row: {
          challenges: string | null
          created_at: string
          district: string | null
          findings: string | null
          id: string
          latitude: number | null
          longitude: number | null
          photo_url: string | null
          project_id: string | null
          recommendations: string | null
          report_date: string
          submitted_by: string | null
          sync_status: string
          title: string
          updated_at: string
          village: string | null
        }
        Insert: {
          challenges?: string | null
          created_at?: string
          district?: string | null
          findings?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          photo_url?: string | null
          project_id?: string | null
          recommendations?: string | null
          report_date?: string
          submitted_by?: string | null
          sync_status?: string
          title: string
          updated_at?: string
          village?: string | null
        }
        Update: {
          challenges?: string | null
          created_at?: string
          district?: string | null
          findings?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          photo_url?: string | null
          project_id?: string | null
          recommendations?: string | null
          report_date?: string
          submitted_by?: string | null
          sync_status?: string
          title?: string
          updated_at?: string
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unp_field_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_finance_transactions: {
        Row: {
          amount: number
          category: string | null
          cost_center: string | null
          created_at: string
          currency: string
          department_id: string | null
          description: string
          grant_id: string | null
          id: string
          payment_method: string | null
          project_id: string | null
          reference_no: string | null
          status: string
          transaction_date: string
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount?: number
          category?: string | null
          cost_center?: string | null
          created_at?: string
          currency?: string
          department_id?: string | null
          description: string
          grant_id?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          reference_no?: string | null
          status?: string
          transaction_date?: string
          transaction_type?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string | null
          cost_center?: string | null
          created_at?: string
          currency?: string
          department_id?: string | null
          description?: string
          grant_id?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          reference_no?: string | null
          status?: string
          transaction_date?: string
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_finance_transactions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_finance_transactions_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "unp_grants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_finance_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_grants: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          department_id: string | null
          description: string | null
          donor_id: string | null
          end_date: string | null
          id: string
          project_id: string | null
          reference_no: string | null
          reporting_schedule: string | null
          stage: string
          start_date: string | null
          submission_deadline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          department_id?: string | null
          description?: string | null
          donor_id?: string | null
          end_date?: string | null
          id?: string
          project_id?: string | null
          reference_no?: string | null
          reporting_schedule?: string | null
          stage?: string
          start_date?: string | null
          submission_deadline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          department_id?: string | null
          description?: string | null
          donor_id?: string | null
          end_date?: string | null
          id?: string
          project_id?: string | null
          reference_no?: string | null
          reporting_schedule?: string | null
          stage?: string
          start_date?: string | null
          submission_deadline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_grants_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_grants_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "unp_donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_grants_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_indicator_entries: {
        Row: {
          created_at: string
          district: string | null
          entry_date: string
          evidence_url: string | null
          id: string
          indicator_id: string
          notes: string | null
          period_label: string | null
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          district?: string | null
          entry_date?: string
          evidence_url?: string | null
          id?: string
          indicator_id: string
          notes?: string | null
          period_label?: string | null
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          district?: string | null
          entry_date?: string
          evidence_url?: string | null
          id?: string
          indicator_id?: string
          notes?: string | null
          period_label?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "unp_indicator_entries_indicator_id_fkey"
            columns: ["indicator_id"]
            isOneToOne: false
            referencedRelation: "unp_indicators"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_indicators: {
        Row: {
          achieved: number | null
          baseline: number | null
          created_at: string
          data_source: string | null
          disaggregation: string | null
          frequency: string | null
          id: string
          indicator_level: string
          name: string
          project_id: string | null
          status: string
          target: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          achieved?: number | null
          baseline?: number | null
          created_at?: string
          data_source?: string | null
          disaggregation?: string | null
          frequency?: string | null
          id?: string
          indicator_level?: string
          name: string
          project_id?: string | null
          status?: string
          target?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          achieved?: number | null
          baseline?: number | null
          created_at?: string
          data_source?: string | null
          disaggregation?: string | null
          frequency?: string | null
          id?: string
          indicator_level?: string
          name?: string
          project_id?: string | null
          status?: string
          target?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_indicators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_inventory_items: {
        Row: {
          category: string | null
          created_at: string
          expiry_date: string | null
          id: string
          item_name: string
          notes: string | null
          quantity: number
          reorder_level: number | null
          sku: string | null
          status: string
          unit: string | null
          unit_cost: number | null
          updated_at: string
          warehouse: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          item_name: string
          notes?: string | null
          quantity?: number
          reorder_level?: number | null
          sku?: string | null
          status?: string
          unit?: string | null
          unit_cost?: number | null
          updated_at?: string
          warehouse?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          item_name?: string
          notes?: string | null
          quantity?: number
          reorder_level?: number | null
          sku?: string | null
          status?: string
          unit?: string | null
          unit_cost?: number | null
          updated_at?: string
          warehouse?: string | null
        }
        Relationships: []
      }
      unp_knowledge: {
        Row: {
          author: string | null
          content: string | null
          created_at: string
          file_url: string | null
          id: string
          knowledge_type: string
          project_id: string | null
          published_date: string | null
          status: string
          summary: string | null
          tags: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          knowledge_type?: string
          project_id?: string | null
          published_date?: string | null
          status?: string
          summary?: string | null
          tags?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          knowledge_type?: string
          project_id?: string | null
          published_date?: string | null
          status?: string
          summary?: string | null
          tags?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_knowledge_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_module_permissions: {
        Row: {
          can_create: boolean
          can_delete: boolean
          can_edit: boolean
          can_view: boolean
          created_at: string
          department_id: string
          id: string
          module_id: string
          updated_at: string
        }
        Insert: {
          can_create?: boolean
          can_delete?: boolean
          can_edit?: boolean
          can_view?: boolean
          created_at?: string
          department_id: string
          id?: string
          module_id: string
          updated_at?: string
        }
        Update: {
          can_create?: boolean
          can_delete?: boolean
          can_edit?: boolean
          can_view?: boolean
          created_at?: string
          department_id?: string
          id?: string
          module_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_module_permissions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_partners: {
        Row: {
          agreement_end: string | null
          agreement_start: string | null
          agreement_type: string | null
          collaboration_areas: string | null
          country: string | null
          created_at: string
          email: string | null
          focal_person: string | null
          id: string
          name: string
          partner_type: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          agreement_end?: string | null
          agreement_start?: string | null
          agreement_type?: string | null
          collaboration_areas?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          focal_person?: string | null
          id?: string
          name: string
          partner_type?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          agreement_end?: string | null
          agreement_start?: string | null
          agreement_type?: string | null
          collaboration_areas?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          focal_person?: string | null
          id?: string
          name?: string
          partner_type?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      unp_procurement_requests: {
        Row: {
          actual_cost: number | null
          created_at: string
          currency: string | null
          delivery_date: string | null
          department_id: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          request_date: string | null
          request_no: string | null
          requested_by: string | null
          stage: string
          supplier: string | null
          title: string
          updated_at: string
        }
        Insert: {
          actual_cost?: number | null
          created_at?: string
          currency?: string | null
          delivery_date?: string | null
          department_id?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          request_date?: string | null
          request_no?: string | null
          requested_by?: string | null
          stage?: string
          supplier?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          actual_cost?: number | null
          created_at?: string
          currency?: string | null
          delivery_date?: string | null
          department_id?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          request_date?: string | null
          request_no?: string | null
          requested_by?: string | null
          stage?: string
          supplier?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_procurement_requests_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unp_procurement_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "org_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_risks: {
        Row: {
          category: string | null
          created_at: string
          id: string
          impact: string
          likelihood: string
          mitigation: string | null
          owner: string | null
          project_id: string | null
          review_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          impact?: string
          likelihood?: string
          mitigation?: string | null
          owner?: string | null
          project_id?: string | null
          review_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          impact?: string
          likelihood?: string
          mitigation?: string | null
          owner?: string | null
          project_id?: string | null
          review_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_risks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "org_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_staff_accounts: {
        Row: {
          access_level: Database["public"]["Enums"]["unp_access_level"]
          approved_at: string | null
          approved_by: string | null
          avatar_url: string | null
          created_at: string
          department_id: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          position: string | null
          status: Database["public"]["Enums"]["unp_account_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["unp_access_level"]
          approved_at?: string | null
          approved_by?: string | null
          avatar_url?: string | null
          created_at?: string
          department_id?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          position?: string | null
          status?: Database["public"]["Enums"]["unp_account_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["unp_access_level"]
          approved_at?: string | null
          approved_by?: string | null
          avatar_url?: string | null
          created_at?: string
          department_id?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string | null
          status?: Database["public"]["Enums"]["unp_account_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unp_staff_accounts_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_trips: {
        Row: {
          created_at: string
          destination: string | null
          distance_km: number | null
          driver: string | null
          fuel_cost: number | null
          id: string
          origin: string | null
          purpose: string | null
          status: string
          trip_date: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          destination?: string | null
          distance_km?: number | null
          driver?: string | null
          fuel_cost?: number | null
          id?: string
          origin?: string | null
          purpose?: string | null
          status?: string
          trip_date?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          destination?: string | null
          distance_km?: number | null
          driver?: string | null
          fuel_cost?: number | null
          id?: string
          origin?: string | null
          purpose?: string | null
          status?: string
          trip_date?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unp_trips_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "unp_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      unp_vehicles: {
        Row: {
          assigned_driver: string | null
          created_at: string
          department_id: string | null
          id: string
          insurance_expiry: string | null
          last_service_date: string | null
          make: string | null
          model: string | null
          notes: string | null
          odometer: number | null
          plate_number: string
          status: string
          updated_at: string
          vehicle_type: string | null
          year: number | null
        }
        Insert: {
          assigned_driver?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          insurance_expiry?: string | null
          last_service_date?: string | null
          make?: string | null
          model?: string | null
          notes?: string | null
          odometer?: number | null
          plate_number: string
          status?: string
          updated_at?: string
          vehicle_type?: string | null
          year?: number | null
        }
        Update: {
          assigned_driver?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          insurance_expiry?: string | null
          last_service_date?: string | null
          make?: string | null
          model?: string | null
          notes?: string | null
          odometer?: number | null
          plate_number?: string
          status?: string
          updated_at?: string
          vehicle_type?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "unp_vehicles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "org_departments"
            referencedColumns: ["id"]
          },
        ]
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
      unp_access: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["unp_access_level"]
      }
      unp_can_delete: { Args: { _user_id: string }; Returns: boolean }
      unp_can_write: { Args: { _user_id: string }; Returns: boolean }
      unp_department: { Args: { _user_id: string }; Returns: string }
      unp_is_approved: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "volunteer" | "user"
      unp_access_level: "admin" | "manager" | "staff" | "viewer"
      unp_account_status: "pending" | "approved" | "suspended" | "rejected"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      unp_access_level: ["admin", "manager", "staff", "viewer"],
      unp_account_status: ["pending", "approved", "suspended", "rejected"],
    },
  },
} as const
