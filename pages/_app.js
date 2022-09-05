import '../styles/globals.css';
import Layout from '../components/layout/layout'
import Head from 'next/head';
import { NotificationCtxProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationCtxProvider>
      <Layout>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationCtxProvider>
  )
}

export default MyApp;
