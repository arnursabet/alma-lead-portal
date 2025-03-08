'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '@/styles';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  );
} 