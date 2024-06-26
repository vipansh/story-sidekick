import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { supabaseClient } from "../lib/supabase";

type ContextValue = {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<ContextValue>(null);

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { session: sessionUser } = (await supabaseClient.auth.getSession())
        .data;

      if (sessionUser) {
        // const { data: profile } = await supabaseClient
        //   .from("profile")
        //   .select("*")
        //   .eq("id", sessionUser.user.id)
        //   .single();

        setUser(sessionUser.user);
      }
    };
    setIsLoading(true);
    fetchUserProfile();

    supabaseClient.auth.onAuthStateChange(() => {
      fetchUserProfile();
    });
    setIsLoading(false);
  }, []);

  const login = async () => {
    await supabaseClient.auth.signInWithOAuth({ provider: "google" });
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const contextValue: ContextValue = {
    user,
    login,
    logout,
    isLoading,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
