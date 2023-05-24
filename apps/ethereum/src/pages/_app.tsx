import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={"favicons/apple-touch-icon.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={"favicons/favicon-32x32.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={"favicons/favicon-16x16.png"}
        />
        <link rel="manifest" href={"/manifest.json"} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href={"/favicons/favicon.ico"} />
        <link rel="manifest" href={"/manifest.json"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="ETHEREUM" />
        <meta
          name="keywords"
          content="liquid staking, pstake, $pstake, cosmos, persistence, xprt, atom, eth, stkEth"
        />
        {/*Open Graph Tags*/}
        <meta content="pSTAKE | ETH Liquid Staking" property="og:title" />
        <meta property="og:image" content="/og.jpg" />
        <meta property="og:description" content="Liquid Staking for ETHEREUM" />
        {/*Twitter Tags*/}
        <meta content="pSTAKE | ETH Liquid Staking" property="twitter:title" />
        <meta content="ETHEREUM" property="twitter:description" />
        <meta content="/og.jpg" property="twitter:image" />
        <title>pSTAKE | ETH Liquid Staking</title>
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
