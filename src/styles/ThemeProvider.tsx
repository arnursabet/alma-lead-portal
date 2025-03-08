'use client';

import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { colors, typography, spacing, breakpoints, shadows, borderRadius, transitions, zIndex, padding } from '@/lib/theme';
import GlobalStyles from './GlobalStyles';

// Define a complete theme object
const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
  transitions,
  zIndex,
  padding
};

// Export the theme type for TypeScript
export type Theme = typeof theme;

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </StyledThemeProvider>
  );
} 