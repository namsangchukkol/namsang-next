import '../styles/globals.css'
import DefaultLayout from '../components/layout/DefaultLayout'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { DataGetter } from '../data/dataGetter'

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RecoilRoot>
        <DataGetter />
        <DefaultLayout pageContent={pageProps} router={router}>
          <Component {...pageProps} />
        </DefaultLayout>
      </RecoilRoot>
    </>
  )
}

export default MyApp
