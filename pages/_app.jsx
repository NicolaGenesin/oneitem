import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppWrapper } from '../context/state';
import colors from '../config/theme';
import Feedback from '../components/Feedback';
import Fonts from '../components/Fonts';

const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
});

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const isProductPage = this.props.router.pathname === '/[productId]';
    const isLandingPage = this.props.router.pathname === '/';

    return (
      <ChakraProvider theme={theme}>
        <Fonts />
        <AppWrapper>
          {!isProductPage && (
          <Head>
            <title>ezyou — Sell it easily</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="Sell your handmade gift, vintage & on-trend clothes, unique jewelry, and more… lots more." />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ezyou.shop/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="The easy ecommerce solution, for you" />
            <meta property="og:description" content="Sell your handmade gift, vintage & on-trend clothes, unique jewelry, and more… lots more." />
            <meta property="og:image" content="https://ezyou.shop/assets/og.png" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="ezyou.shop" />
            <meta property="twitter:url" content="https://ezyou.shop/" />
            <meta name="twitter:title" content="The easy ecommerce solution, for you" />
            <meta name="twitter:description" content="Sell your handmade gift, vintage \& on-trend clothes, unique jewelry, and more… lots more." />
            <meta name="twitter:image" content="https://ezyou.shop/assets/og.png" />

            {isLandingPage && (
              <div>
                <link rel="preload" href="assets/home-01.jpg" as="image" />
                <link rel="preload" href="assets/home-02.jpg" as="image" />
                <link rel="preload" href="assets/home-04.jpg" as="image" />
                <link rel="preload" href="assets/home-05.jpg" as="image" />
                <link rel="preload" href="assets/home-08.jpg" as="image" />
                <link rel="preload" href="assets/home-09.jpg" as="image" />
              </div>
            )}
          </Head>
          )}
          <Component {...pageProps} />
          {!isProductPage && <Feedback />}
        </AppWrapper>
        <style global jsx>
          {`
            html, body {
              background: ${isProductPage ? '#ffffff' : '#f7fff7'};
            }
          `}
        </style>
      </ChakraProvider>
    );
  }
}
