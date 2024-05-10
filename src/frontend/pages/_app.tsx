// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import CurrencyProvider from '../providers/Currency.provider';
import CartProvider from '../providers/Cart.provider';
import { ThemeProvider } from 'styled-components';
import Theme from '../styles/Theme';
import FrontendTracer from '../utils/telemetry/FrontendTracer';
import { initConviva, trackConvivaPage, trackConvivaEvent, setConvivaUserId } from '../utils/telemetry/conviva';
import SessionGateway from '../gateways/Session.gateway';


declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_PLATFORM?: string;
      NEXT_PUBLIC_OTEL_SERVICE_NAME?: string;
      NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT?: string;
      IS_SYNTHETIC_REQUEST?: string;
    };
  }
}

if (typeof window !== 'undefined') {
  const collector = getCookie('otelCollectorUrl')?.toString() || '';
  FrontendTracer(collector);
  initConviva();
  console.log('Tracking App Loaded');
  trackConvivaEvent("[MH] App Loaded");
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { loggedIn, userId } = SessionGateway.getSession();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn && router.route !== '/login') {
      console.log('Not logged in, go to /login from', router.route);
      router.push('/login');
    }
  }, [loggedIn, router, router.route]);

  useEffect(() => {
    if (loggedIn && userId) {
      console.log('Setting User ID', userId);
      setConvivaUserId(userId);
    }
  }, [loggedIn, userId]);

  useEffect(() => {
    console.log('Tracking Conviva Page View', router.query);
    trackConvivaPage();
  }, [router.query]);

  return (
    <ThemeProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
