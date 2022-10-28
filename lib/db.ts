import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://zxxdpypgblupvqkazilp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eGRweXBnYmx1cHZxa2F6aWxwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2Njk4MzY4NywiZXhwIjoxOTgyNTU5Njg3fQ.S5M7_AkDeNyQD93Q1b4QYLjeklIx24agaKn6QWc-laU'
);
