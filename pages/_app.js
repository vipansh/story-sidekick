import { Toaster } from "sonner";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
