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

/**
 * Brief: Composant wrapper pour fournir QueryClient, gestion d'erreur et contexte utilisateur
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Composants enfants à wrapper
 * @returns {JSX.Element} Wrapper avec QueryClientProvider, ErrorBoundary et UserDataProvider
 */
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