import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import TagManager from 'react-gtm-module';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

import { track } from '@lib/gtm';
import { SiteContextProvider } from '@lib/context';
import { isBrowser } from '@lib/helpers';
import Cart from '@modules/shop/cart';

import '../styles/tailwind.css';
import '../styles/app.css';

const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
};

const MyApp = ({ Component, pageProps, router }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);

    const { asPath } = router;
    track('pageview', {
      page: asPath,
    });
  }, []);

  // The scroll location on the page is not restored on history changes
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, [router]);

  // Trigger our loading class
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.classList.toggle('is-loading', isLoading);
    }
  }, [isLoading]);

  // Setup Next router events
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      // Bail if we're just changing a URL parameter
      if (
        url.indexOf('?') > -1 &&
        url.split('?')[0] === router.asPath.split('?')[0]
      ) {
        return;
      }

      // Otherwise, start loading
      setLoading(true);
    });

    Router.events.on('routeChangeComplete', (url) => {
      track('pageview', {
        page: url,
      });
      setTimeout(() => setLoading(false), 400); // accounts for page transition
    });

    Router.events.on('routeChangeError', () => {
      setLoading(false);
    });
  }, []);

  // intelligently add focus states if keyboard is used
  const handleFirstTab = (event) => {
    if (event.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add('is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
    <ThemeProvider disableTransitionOnChange>
      <SiteContextProvider data={{ ...pageProps?.data?.site }}>
        <LazyMotion features={domAnimation}>
          {isLoading && (
            <Head>
              <title>Loading...</title>
            </Head>
          )}
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => {
              window.scrollTo(0, 0);
              document.body.classList.remove('overflow-hidden');
            }}
          >
            <Component key={router.asPath.split('?')[0]} {...pageProps} />
          </AnimatePresence>

          <Cart data={{ ...pageProps?.data?.site }} />
        </LazyMotion>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
