import Head from 'next/head'
import App from 'next/app';
import { AppWrapper } from '../context/state';

export default class CustomApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <AppWrapper>
        <Head>
          <title>One9</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </AppWrapper>
    )
  }
}