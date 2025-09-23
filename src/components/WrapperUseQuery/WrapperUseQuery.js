'use client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ErrorBoundary } from "react-error-boundary";
import { UserDataProvider } from "@context/UserContext";
import { getUpdateTimestamp } from '@/lib/utils';
import Error from 'app/(user)/error';


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
    <ErrorBoundary fallback={<Error />}>
      <UserDataProvider>
        {children}
      </UserDataProvider>
    </ErrorBoundary>
  </QueryClientProvider>
  );
}