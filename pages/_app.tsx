import { AppProps } from "next/app";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";
import { Toaster } from "sonner";

import UserProvider from "../@/context/user";
import "../styles/globals.css";

//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <PostHogProvider client={posthog}>
      <UserProvider>
        <Component {...pageProps} />
        <Toaster />
      </UserProvider>
    </PostHogProvider>
  );
};

export default MyApp;
