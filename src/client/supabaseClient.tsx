import { createBrowserClient } from "@supabase/ssr";

// supabaseClient.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) throw new Error("Env variables not set");
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
