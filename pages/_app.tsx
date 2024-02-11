import React from "react";
import { AppProps } from "next/app";
import { Toaster } from "sonner";
import "../styles/globals.css";
import UserProvider from "../@/context/user";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
};

export default MyApp;
