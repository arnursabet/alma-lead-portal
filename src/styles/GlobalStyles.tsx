'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: var(--font-montserrat), sans-serif;
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.background};
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-montserrat), sans-serif;
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.medium};
  }

  button {
    cursor: pointer;
    font-family: var(--font-montserrat), sans-serif;
  }

  input, textarea, select {
    font-family: var(--font-montserrat), sans-serif;
  }
`;

export default GlobalStyles; 