import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabase";

type ContextValue = {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<ContextValue>(null);

export type User = {
  user_metadata: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    phone_verified: boolean;
    picture: string;
    provider_id: string;
    sub: string;
  };
};

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null | any>(null);
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

        setUser({
          ...sessionUser.user,
          // ...profile,
        });
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
