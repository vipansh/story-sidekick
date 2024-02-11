import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabase";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { session: sessionUser } = (await supabaseClient.auth.getSession())
        .data;

      if (sessionUser) {
        const { data: profile } = await supabaseClient
          .from("profile")
          .select("*")
          .eq("id", sessionUser.user.id)
          .single();

        setUser({
          ...sessionUser.user,
          ...profile,
        });
      }
    };

    fetchUserProfile();

    supabaseClient.auth.onAuthStateChange(() => {
      fetchUserProfile();
    });
  }, []);

  const login = async () => {
    await supabaseClient.auth.signInWithOAuth({ provider: "google" });
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
