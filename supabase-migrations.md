# Supabase Migrations - RCG Estates

> Run these SQL statements in the Supabase Dashboard → SQL Editor, or via the Supabase CLI.

---

## 1. Create the `leads` Table

```sql
-- Enable UUID extension (usually already enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.leads (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  message      TEXT,
  status       TEXT NOT NULL DEFAULT 'new',
  source       TEXT NOT NULL DEFAULT 'website_contact_form'
);
```

---

## 2. Enable Row Level Security

```sql
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
```

---

## 3. RLS Policies

### Allow anonymous users to INSERT (submit the form)
```sql
CREATE POLICY "anon_can_insert_leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);
```

### Allow authenticated users (Raul, admin) to SELECT, UPDATE, DELETE
```sql
CREATE POLICY "authenticated_can_read_leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "authenticated_can_update_leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "authenticated_can_delete_leads"
ON public.leads
FOR DELETE
TO authenticated
USING (true);
```

---

## 4. Indexes

```sql
-- Speeds up lead lookups by email and chronological sorting
CREATE INDEX idx_leads_email      ON public.leads (email);
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_status     ON public.leads (status);
```

---

## 5. Optional: Lead Status Enum

If you want to enforce valid status values (recommended for the pipeline):

```sql
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'qualified',
  'proposal_sent',
  'won',
  'lost'
);

-- Alter the column to use the enum
ALTER TABLE public.leads
  ALTER COLUMN status TYPE lead_status
  USING status::lead_status;
```

---

## 6. TypeScript Type (already in supabaseClient.ts)

```ts
export type LeadInsert = {
  first_name: string;
  last_name:  string;
  email:      string;
  phone?:     string;
  message?:   string;
};
```

---

## 7. Verify Everything Works

After running the migrations, test with this SQL in the editor:

```sql
-- Simulate an anonymous insert (should succeed)
INSERT INTO public.leads (first_name, last_name, email, phone, message)
VALUES ('Test', 'User', 'test@example.com', '(956) 555-0100', 'Test message from Supabase editor.');

-- Confirm it landed
SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 5;

-- Clean up test row
DELETE FROM public.leads WHERE email = 'test@example.com';
```

---

## Notes

- **Anon key safety:** The `anon` key is exposed in the browser (`NEXT_PUBLIC_*`). With RLS enabled and only INSERT allowed for `anon`, no leads data can be read or modified by the public.
- **Webhook:** The n8n webhook URL in `WEBHOOK_CONTACT_URL` receives the same payload as Supabase. Configure your n8n workflow to forward to email or a CRM (HubSpot, Notion, etc.).
- **Email notifications:** Consider adding a Supabase Database Webhook → n8n trigger on INSERT to `leads` for instant email alerts to `rceron.tx@gmail.com`.
