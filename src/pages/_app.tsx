import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import TermsModal from "../components/organisms/termsModal";
import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../helpers/gtag";

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

  const GA_TRACKING_ID = "ssssss123";
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
          `
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
          content="pSTAKE, developed by Persistence, is a liquid staking protocol unlocking the liquidity of staked assets. Stakers of PoS tokens can stake their assets while unlocking liquidity in the form of stkASSETs, which can then be used across DeFi to earn liquid staking rewards."
        />
        <meta
          name="keywords"
          content="liquid staking, pstake, $pstake, cosmos, persistence, xprt, atom, stkBNB, stkETH, stkATOM"
        />
        {/*Open Graph Tags*/}
        <meta
          content="pSTAKE | Unlocking liquidity of staked assets"
          property="og:title"
        />
        <meta property="og:image" content="/og.jpg" />
        <meta
          property="og:description"
          content="pSTAKE, developed by Persistence, is a liquid staking protocol unlocking the liquidity of staked assets. Stakers of PoS tokens can stake their assets while unlocking liquidity in the form of stkASSETs, which can then be used across DeFi to earn liquid staking rewards."
        />
        {/*Twitter Tags*/}
        <meta
          content="pSTAKE | Unlocking liquidity of staked assets"
          property="twitter:title"
        />
        <meta
          content="pSTAKE, developed by Persistence, is a liquid staking protocol unlocking the liquidity of staked assets. Stakers of PoS tokens can stake their assets while unlocking liquidity in the form of stkASSETs, which can then be used across DeFi to earn liquid staking rewards."
          property="twitter:description"
        />
        <meta content="/og.jpg" property="twitter:image" />
        <title>pSTAKE | Unlocking liquidity of staked assets</title>
      </Head>
      <TermsModal />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
