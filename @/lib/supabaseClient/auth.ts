import { supabaseClient } from "../supabase";

export const login = async () => {
      await supabaseClient.auth.signInWithOAuth({
            provider: "google",
      });
};