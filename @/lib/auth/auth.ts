import { supabaseClient } from "../supabase";

export const login = async () => {
  await supabaseClient.auth.signInWithOAuth({
    provider: "google",
  });
};

export const logout = async () => {
  await supabaseClient.auth.signOut();
};


