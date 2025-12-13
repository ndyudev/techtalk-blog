import { createClient } from "@supabase/supabase-js";

// Vite dùng import.meta.env để lấy biến môi trường
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
