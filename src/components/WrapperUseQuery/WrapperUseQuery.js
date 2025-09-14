
'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { UserDataProvider } from "@context/UserContext";
import { getUpdateTimestamp } from '@/lib/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000*60,
      initialDataUpdatedAt: getUpdateTimestamp(),
    },
  },
})

export default function WrapperUseQuery({ children }) {
  return (
  <QueryClientProvider client={queryClient}>
    <UserDataProvider>
      {children}
    </UserDataProvider>
  </QueryClientProvider>
  );
}