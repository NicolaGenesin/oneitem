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

    return (
      <ChakraProvider theme={theme}>
        <AppWrapper>
          <Head>
            <title>ezyou</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </AppWrapper>
      </ChakraProvider>
    );
  }
}
