import { AppProps } from "next/app";
import React from "react";
import { Toaster } from "sonner";

import UserProvider from "../@/context/user";
import "../styles/globals.css";

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
