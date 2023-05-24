import "../styles/styles.css";
import "ui/styles/globals.css";
import type { AppProps } from "next/app";
import { CHAIN_ID, ExternalChains } from "../helpers/config";
import WalletProvider from "../context/WalletConnect/WalletConnect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store";
import { Provider } from "react-redux";
import { ChainInfo } from "@keplr-wallet/types";
import Maintenance from "./maintenance";
import TermsModal from "../components/organisms/termsModal";
import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../helpers/gtag";
import { GA_TRACKING_ID } from "../../AppConstants";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

  let persistenceChainInfo = ExternalChains[env].find(
    (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].persistenceChainID
  );

  let cosmosChainInfo = ExternalChains[env].find(
    (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].cosmosChainID
  );

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      {/* eslint-disable-next-line @next/next/inline-script-id */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Liquid Staking for The Internet of Blockchains"
        />
        <meta
          name="keywords"
          content="liquid staking, pstake, $pstake, cosmos, persistence, xprt, atom"
        />
        {/*Open Graph Tags*/}
        <meta content="pSTAKE | ATOM Liquid Staking" property="og:title" />
        <meta property="og:image" content="/og.jpg" />
        <meta
          property="og:description"
          content="Liquid Staking for The Internet of Blockchains"
        />
        {/*Twitter Tags*/}
        <meta content="pSTAKE | ATOM Liquid Staking" property="twitter:title" />
        <meta
          content="Liquid Staking for The Internet of Blockchains"
          property="twitter:description"
        />
        <meta content="/og.jpg" property="twitter:image" />
        <title>pSTAKE | ATOM Liquid Staking</title>
      </Head>
      <Provider store={store}>
        <TermsModal />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <WalletProvider
          persistenceChainInfo={persistenceChainInfo!}
          cosmosChainInfo={cosmosChainInfo!}
        >
          {process.env.NEXT_PUBLIC_MAINTENANCE === "true" ? (
            <Maintenance />
          ) : (
            <Component {...pageProps} />
          )}
        </WalletProvider>
      </Provider>
    </>
  );
}

export default MyApp;
