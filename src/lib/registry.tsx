'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * StyledComponentsRegistry
 * 
 * This component is responsible for collecting all CSS style rules generated
 * during a server-side render and injecting them into the <head> HTML tag.
 * 
 * It ensures that styles are properly applied during SSR and hydration.
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    try {
      // Get all styles collected during render
      const styles = styledComponentsStyleSheet.getStyleElement();
      // Clear the sheet for the next render
      styledComponentsStyleSheet.instance.clearTag();
      return <>{styles}</>;
    } catch (error) {
      // Log any errors that occur during style extraction
      console.error('Error extracting styled-components styles:', error);
      return null;
    }
  });

  // If we're in the browser, we don't need the StyleSheetManager
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  // During SSR, wrap children with StyleSheetManager to collect styles
  try {
    return (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance} enableVendorPrefixes>
        {children}
      </StyleSheetManager>
    );
  } catch (error) {
    console.error('Error in StyleSheetManager:', error);
    return <>{children}</>;
  }
} 