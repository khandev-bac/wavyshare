import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.ANON_KEY!;
export const superbase = createClient(supabaseUrl, supabaseKey);