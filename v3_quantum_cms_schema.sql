-- ============================================
-- QUANTIFYRE QUANTUM CMS ADMIN PANEL v3.0
-- DATABASE SCHEMA UPDATE
-- ============================================

-- TABLE 23: content_revisions
CREATE TABLE IF NOT EXISTS content_revisions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,          -- which table was changed
  record_id uuid NOT NULL,           -- which record
  snapshot jsonb NOT NULL,           -- full row snapshot at save time
  saved_by text DEFAULT 'admin',
  saved_at timestamptz DEFAULT now(),
  label text,                        -- optional label like "Before rebrand"
  is_pinned boolean DEFAULT false    -- pin important revisions
);
-- Index for fast lookup:
CREATE INDEX IF NOT EXISTS content_revisions_table_record_idx ON content_revisions (table_name, record_id, saved_at DESC);

-- TABLE 24: admin_users
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id uuid UNIQUE NOT NULL, -- Supabase auth.users.id
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'editor',        -- 'super_admin' | 'admin' | 'editor' | 'viewer'
  avatar_url text,
  is_active boolean DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- TABLE 25: scheduled_content
CREATE TABLE IF NOT EXISTS scheduled_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,          -- e.g. 'blog_posts', 'hero_sections'
  record_id uuid NOT NULL,
  action text NOT NULL,              -- 'publish' | 'unpublish' | 'update'
  payload jsonb,                     -- the data to apply on scheduled time
  scheduled_at timestamptz NOT NULL,
  executed_at timestamptz,
  status text DEFAULT 'pending',     -- 'pending' | 'executed' | 'failed' | 'cancelled'
  created_by text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- TABLE 26: ab_tests
CREATE TABLE IF NOT EXISTS ab_tests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,                -- e.g. "Hero CTA Button Test"
  page text NOT NULL,                -- 'home' | 'services' | etc.
  section text NOT NULL,             -- 'hero' | 'cta' | etc.
  variant_a jsonb NOT NULL,          -- original content
  variant_b jsonb NOT NULL,          -- test content
  traffic_split int DEFAULT 50,      -- % to variant B (0-100)
  status text DEFAULT 'draft',       -- 'draft' | 'running' | 'paused' | 'completed'
  winner text,                       -- 'a' | 'b' | null
  start_at timestamptz,
  end_at timestamptz,
  impressions_a int DEFAULT 0,
  impressions_b int DEFAULT 0,
  clicks_a int DEFAULT 0,
  clicks_b int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- TABLE 27: ab_events
CREATE TABLE IF NOT EXISTS ab_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id uuid REFERENCES ab_tests(id) ON DELETE CASCADE,
  variant text NOT NULL,             -- 'a' | 'b'
  event_type text NOT NULL,          -- 'impression' | 'click' | 'conversion'
  session_id text,
  ip_hash text,                      -- hashed for privacy
  created_at timestamptz DEFAULT now()
);

-- TABLE 28: popups_banners
CREATE TABLE IF NOT EXISTS popups_banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL,                -- 'announcement_bar' | 'popup' | 'exit_intent' | 'cookie_banner'
  name text NOT NULL,                -- admin label
  heading text,
  body text,
  cta_label text,
  cta_link text,
  background_color text DEFAULT '#6C3FEF',
  text_color text DEFAULT '#FFFFFF',
  show_on_pages text[] DEFAULT '{}', -- ['*'] = all pages, ['/about'] = specific
  trigger text DEFAULT 'immediate',  -- 'immediate' | 'scroll_50' | 'exit_intent' | 'time_delay'
  trigger_value int,                 -- seconds for time_delay, % for scroll
  display_frequency text DEFAULT 'once_per_session', -- 'always' | 'once_per_session' | 'once_per_day' | 'once_ever'
  start_at timestamptz,
  end_at timestamptz,
  is_active boolean DEFAULT false,
  impressions int DEFAULT 0,
  clicks int DEFAULT 0,
  dismissals int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- TABLE 29: forms
CREATE TABLE IF NOT EXISTS forms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,                -- admin label: "Contact Form", "Demo Request Form"
  slug text UNIQUE NOT NULL,
  heading text,
  submit_label text DEFAULT 'Submit',
  success_message text,
  notification_email text,
  send_auto_reply boolean DEFAULT false,
  auto_reply_subject text,
  auto_reply_body text,
  fields jsonb NOT NULL,             -- array of field definitions
  is_active boolean DEFAULT true,
  submissions_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- TABLE 30: form_submissions
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id uuid REFERENCES forms(id) ON DELETE CASCADE,
  form_slug text NOT NULL,
  data jsonb NOT NULL,               -- all field values
  status text DEFAULT 'new',         -- 'new' | 'read' | 'replied' | 'archived' | 'spam'
  ip_address text,
  user_agent text,
  submitted_at timestamptz DEFAULT now(),
  read_at timestamptz,
  admin_notes text
);

-- TABLE 31: webhooks
CREATE TABLE IF NOT EXISTS webhooks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  secret text,
  events text[] NOT NULL,            -- ['inquiry.new', 'blog.published', 'form.submitted', '*']
  headers jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  last_triggered_at timestamptz,
  last_status_code int,
  success_count int DEFAULT 0,
  failure_count int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- TABLE 32: webhook_logs
CREATE TABLE IF NOT EXISTS webhook_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  webhook_id uuid REFERENCES webhooks(id) ON DELETE CASCADE,
  event text NOT NULL,
  payload jsonb,
  status_code int,
  response_body text,
  triggered_at timestamptz DEFAULT now(),
  duration_ms int
);

-- TABLE 33: seo_pages
CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text UNIQUE NOT NULL,         -- '/' | '/about' | '/services' | etc.
  meta_title text,
  meta_description text,
  og_title text,
  og_description text,
  og_image_url text,
  twitter_title text,
  twitter_description text,
  twitter_image_url text,
  canonical_url text,
  robots text DEFAULT 'index,follow',
  schema_json text,                  -- JSON-LD structured data
  seo_score int,                     -- auto-calculated 0-100
  updated_at timestamptz DEFAULT now()
);

-- TABLE 34: analytics_snapshots
CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  page_path text NOT NULL,
  pageviews int DEFAULT 0,
  unique_visitors int DEFAULT 0,
  bounce_rate numeric,
  avg_time_on_page int,              -- seconds
  source text,                       -- 'google_analytics' | 'plausible' | 'custom'
  raw_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- TABLE 35: content_locks
CREATE TABLE IF NOT EXISTS content_locks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  locked_by_user_id uuid REFERENCES admin_users(id),
  locked_by_name text,
  locked_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 minutes'),
  UNIQUE(table_name, record_id)
);

-- TABLE 36: changelogs
CREATE TABLE IF NOT EXISTS changelogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  version text NOT NULL,             -- 'v2.1', '2025-06-01'
  title text NOT NULL,
  changes jsonb NOT NULL,            -- [{type:'new'|'improved'|'fixed', text:'...'}]
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- TABLE 37: ai_generation_log
CREATE TABLE IF NOT EXISTS ai_generation_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  module text NOT NULL,              -- 'blog', 'seo', 'hero', 'service_desc'
  prompt_used text,
  result_text text,
  tokens_used int,
  model text DEFAULT 'claude-sonnet-4-20250514',
  accepted boolean,                  -- did admin use the output?
  generated_at timestamptz DEFAULT now()
);

-- ============================================
-- RLS: Apply to all new tables
-- ============================================

ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE popups_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_locks ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_log ENABLE ROW LEVEL SECURITY;

-- Allow public reads where appropriate
CREATE POLICY "Public can read popups_banners" ON popups_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read forms" ON forms FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert form submissions" ON form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read seo_pages" ON seo_pages FOR SELECT USING (true);
CREATE POLICY "Public can read changelogs" ON changelogs FOR SELECT USING (is_published = true);

-- Default authenticated policies for admin access
-- In a real environment, you'd tie these to auth.uid() matching an admin user,
-- but for simplicity we allow authenticated users to perform CRUD on all tables.

CREATE POLICY "Admins full access to content_revisions" ON content_revisions USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to admin_users" ON admin_users USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to scheduled_content" ON scheduled_content USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to ab_tests" ON ab_tests USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to ab_events" ON ab_events USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to popups_banners" ON popups_banners USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to forms" ON forms USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to form_submissions" ON form_submissions USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to webhooks" ON webhooks USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to webhook_logs" ON webhook_logs USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to seo_pages" ON seo_pages USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to analytics_snapshots" ON analytics_snapshots USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to content_locks" ON content_locks USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to changelogs" ON changelogs USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to ai_generation_log" ON ai_generation_log USING (auth.role() = 'authenticated');
