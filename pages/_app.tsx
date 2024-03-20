import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
export default function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>Basedrop</title>
          <meta name="description" content="Scrapbook canvas for creatives & brainstormers" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
