import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppWrapper } from '../context/state';
import colors from '../config/theme';

const theme = extendTheme({ colors });

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const isProductPage = this.props.router.pathname === '/[storeId]/[productId]';

    return (
      <ChakraProvider theme={theme}>
        <AppWrapper>
          {!isProductPage && (
          <Head>
            <title>ezyou</title>
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:title" content="ezyou online shop" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ezyou.shop" />
            <meta property="og:image" content="https://ezyou.shop/assets/og-01.png" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height" content="200" />
            <meta property="og:description" content="Site description" />
          </Head>
          )}
          <Component {...pageProps} />
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
