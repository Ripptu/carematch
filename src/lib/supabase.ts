import { createClient } from '@supabase/supabase-js';

// Hardcoded to ensure no environment variables override with invalid values
const supabaseUrl = 'https://snngiegcsgroakangjuy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNubmdpZWdjc2dyb2FrYW5nanV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2OTIxNzQsImV4cCI6MjA4OTI2ODE3NH0.DE9T8S7aE-wTRlqPl5NPjyMmTQCyriOJNKkUZwbtqII';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
