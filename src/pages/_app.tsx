import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import {SessionProvider} from 'next-auth/react'

//create a client

const queryClient = new QueryClient();

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
    </SessionProvider>
  );
}
