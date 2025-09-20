'use client';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useQueryClient,
} from '@tanstack/react-query'
import { ErrorBoundary } from "react-error-boundary";
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
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={<Error />}>
          <UserDataProvider>
            {children}
          </UserDataProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </QueryClientProvider>
  );
}