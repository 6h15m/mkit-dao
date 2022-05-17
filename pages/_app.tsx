import { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  if (
    process.env.NEXT_PUBLIC_APP_ID == null ||
    process.env.NEXT_PUBLIC_SERVER_URL == null
  ) {
    window.alert(`Please set env files :(`);
    return;
  }

  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}
export default MyApp;
