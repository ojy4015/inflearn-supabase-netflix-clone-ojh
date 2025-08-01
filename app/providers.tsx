'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RecoilProvider from '@/config/RecoilProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  // Creates the global QueryClient for the app
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000, // 1 minute
        },
      },
    });
  });

  return (
    <RecoilProvider>
      {/* This makes the QueryClient available to all React components in your app via React Context. */}
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilProvider>
  );
};
export default Providers;

// App starts:
// A single QueryClient is created and provided to the app.
// Server-side rendering:
// A temporary QueryClient is used to prefetch data.
// The state is dehydrated and sent to the client.
// Client-side hydration:
// The global QueryClient rehydrates with the prefetched data.
// Component usage:
// Components use useQueryClient() to interact with the global cache (invalidate, refetch, etc.).
// All cache updates are global and reflected across the app.

// There is only one global QueryClient on the client (provided via context).
// Temporary QueryClients are used on the server for SSR/SSG prefetching.
// All communication (cache, invalidation, etc.) happens through the global QueryClient, ensuring data consistency across your app.
