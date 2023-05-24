"use client"
import { ReactNode, type FC } from 'react';
import Hydrate from './helpers/Hydrate';
import ThemeProvider from './providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
  const queryClient = new QueryClient()
  return (
<Hydrate>
<QueryClientProvider client={queryClient}>
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
<Toaster position='top-center' reverseOrder={false} toastOptions={{
  className: 'dark:bg-my-neutral-950 dark:text-my-neutral-50 bg-my-neutral-50 text-my-neutral-950 font-semibold',
  duration: 5000  }} />
{children}
</ThemeProvider>
</QueryClientProvider>
</Hydrate>

)
}

export default Providers