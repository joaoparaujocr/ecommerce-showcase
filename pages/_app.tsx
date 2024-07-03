import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '../contexts/ThemeContext';
import { CacheProvider } from '@emotion/react';

import createEmotionCache from '../lib/emotionCache';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { EmotionCache } from '@emotion/react';

type AppPropsWithCache = AppProps & {
    Component: NextPage;
    emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: AppPropsWithCache) => {
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;