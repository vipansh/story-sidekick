import React from "react";
import { AppProps } from "next/app";
import { Toaster } from "sonner";
import "../styles/globals.css";
import UserProvider from "../@/context/user";

//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
};

export default MyApp;
