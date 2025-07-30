'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     // With SSR, we usually want to set some default staleTime
  //     // above 0 to avoid refetching immediately on the client
  //     staleTime: 60 * 1000, // 1 minute
  //   },
  // },
});

export default function ReactQueryClientProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
