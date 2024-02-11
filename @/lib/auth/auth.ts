import { supabaseClient } from "../supabase";

export const login = async () => {
  await supabaseClient.auth.signInWithOAuth({
    provider: "google",
  });
};

export const logout = async () => {
  await supabaseClient.auth.signOut();
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser().then(data => data);
  console.log({ user: supabaseClient.auth.getUser() })
  return user;
};
