import "../styles/globals.css";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SEO } from "../../next-seo.config";
import { queryClient } from "../lib/query-client";
import { persistor, store } from "../store/store";
import { SessionProvider } from "next-auth/react";
import MainLayout from "../components/layout/main-layout";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <NuqsAdapter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <HydrationBoundary state={pageProps.dehydratedState}>
                <DefaultSeo {...SEO} />
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </HydrationBoundary>
              {process.env.NODE_ENV !== "production" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </QueryClientProvider>
          </PersistGate>
        </Provider>
        <Toaster position="top-right" />
      </NuqsAdapter>
    </SessionProvider>
  );
}
