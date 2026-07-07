import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://wcimextrjelgwbklqirk.supabase.co";

const supabaseKey =
  "sb_publishable_7EuqXoFARws4b6ag4o-A7Q_QNlMeHUR";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);