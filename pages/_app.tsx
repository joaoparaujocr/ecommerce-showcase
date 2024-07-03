import * as React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'
import { CacheProvider } from '@emotion/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import createEmotionCache from '../lib/emotionCache'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { EmotionCache } from '@emotion/react'

type AppPropsWithCache = AppProps & {
  Component: NextPage;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache()

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithCache) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

export default MyApp;