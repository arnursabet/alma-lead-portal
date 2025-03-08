'use client';

export interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
    status: {
      pending: {
        background: string;
        text: string;
      };
      reachedOut: {
        background: string;
        text: string;
      };
    };
    // Alma colors
    black: string;
    cream: string;
    grey4: string;
    apple: string;
    moss: string;
    white: string;
    sun: string;
    sunLight: string;
    grey3: string;
    grey2: string;
    white80: string;
    grass: string;
    honey: string;
    appleLight: string;
    black80: string;
    moss20: string;
    white20: string;
    moss80: string;
    black60: string;
    black20: string;
    honeyLight: string;
    grassLight: string;
    cloud: string;
  };
  typography: {
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
      headingHuge: string;
    };
    fontWeights: {
      normal: number;
      medium: number;
      bold: number;
      heavy: number;
    };
    fontFamily: {
      primary: string;
    };
  };
  spacing: {
    base: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    xxlarge: string;
    xsmall: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: {
    round: string;
    xsmall: string;
    small: string;
    base: string;
    medium: string;
  };
  transitions: {
    default: string;
  };
  zIndex: {
    modal: number;
    overlay: number;
    dropdown: number;
    header: number;
    footer: number;
  };
  padding: {
    card: string;
    horizontal: string;
    heroInner: string;
    vertical: string;
  };
}

// Colors
export const colors = {
  primary: 'var(--_alma-variables---colors--apple)',
  primaryDark: 'var(--_alma-variables---colors--moss)',
  secondary: 'var(--_alma-variables---colors--sun)',
  background: 'var(--_alma-variables---colors--white)',
  error: '#D32F2F',
  success: '#2E7D32',
  warning: 'var(--_alma-variables---colors--honey)',
  info: '#0288D1',
  border: 'var(--_alma-variables---colors--grey-3)',
  text: {
    primary: 'var(--_alma-variables---colors--black)',
    secondary: 'var(--_alma-variables---colors--grey-4)',
    light: 'var(--_alma-variables---colors--grey-3)',
  },
  status: {
    pending: {
      background: 'var(--_alma-variables---colors--sun-light)',
      text: 'var(--_alma-variables---colors--honey)',
    },
    reachedOut: {
      background: 'var(--_alma-variables---colors--grass-light)',
      text: 'var(--_alma-variables---colors--grass)',
    },
  },
  // Alma colors
  black: 'var(--_alma-variables---colors--black)',
  cream: 'var(--_alma-variables---colors--cream)',
  grey4: 'var(--_alma-variables---colors--grey-4)',
  apple: 'var(--_alma-variables---colors--apple)',
  moss: 'var(--_alma-variables---colors--moss)',
  white: 'var(--_alma-variables---colors--white)',
  sun: 'var(--_alma-variables---colors--sun)',
  sunLight: 'var(--_alma-variables---colors--sun-light)',
  grey3: 'var(--_alma-variables---colors--grey-3)',
  grey2: 'var(--_alma-variables---colors--grey-2)',
  white80: 'var(--_alma-variables---colors--white-80)',
  grass: 'var(--_alma-variables---colors--grass)',
  honey: 'var(--_alma-variables---colors--honey)',
  appleLight: 'var(--_alma-variables---colors--apple-light)',
  black80: 'var(--_alma-variables---colors--black-80)',
  moss20: 'var(--_alma-variables---colors--moss-20)',
  white20: 'var(--_alma-variables---colors--white-20)',
  moss80: 'var(--_alma-variables---colors--moss-80)',
  black60: 'var(--_alma-variables---colors--black-60)',
  black20: 'var(--_alma-variables---colors--black-20)',
  honeyLight: 'var(--_alma-variables---colors--honey-light)',
  grassLight: 'var(--_alma-variables---colors--grass-light)',
  cloud: 'var(--_alma-variables---colors--cloud)',
};

// Typography
export const typography = {
  fontSizes: {
    xsmall: '0.625rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
    xlarge: '1.25rem',
    xxlarge: '1.5rem',
    xxxlarge: '2rem',
    headingHuge: 'var(--_alma-variables---text-size--heading-huge)',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 900,
  },
  fontFamily: {
    primary: 'var(--font-montserrat), sans-serif',
  },
};

// Spacing
export const spacing = {
  base: 'var(--_alma-variables---spacing--base)',
  small: 'var(--_alma-variables---spacing--small)',
  medium: 'var(--_alma-variables---spacing--medium)',
  large: 'var(--_alma-variables---spacing--large)',
  xlarge: 'var(--_alma-variables---spacing--xlarge)',
  xxlarge: 'var(--_alma-variables---spacing--2xlarge)',
  xsmall: 'var(--_alma-variables---spacing--xsmall)',
};

// Breakpoints
export const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  wide: '1200px',
};

// Shadows
export const shadows = {
  small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
  large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
};

// Border radius
export const borderRadius = {
  round: '50%',
  xsmall: 'var(--_alma-variables---radius--xsmall)',
  small: 'var(--_alma-variables---radius--small)',
  base: 'var(--_alma-variables---radius--base)',
  medium: 'var(--_alma-variables---radius--medium)',
};

// Transitions
export const transitions = {
  default: 'all 0.3s ease',
};

// Z-index
export const zIndex = {
  modal: 1000,
  overlay: 900,
  dropdown: 800,
  header: 700,
  footer: 600,
};

// Padding
export const padding = {
  card: 'var(--_alma-variables---padding--card-padding)',
  horizontal: 'var(--_alma-variables---padding--horizontal)',
  heroInner: 'var(--_alma-variables---padding--hero-inner)',
  vertical: 'var(--_alma-variables---padding--vertical)',
};

// Media queries
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
};

// Complete theme object
const theme: Theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
  transitions,
  zIndex,
  padding,
};

export default theme; 