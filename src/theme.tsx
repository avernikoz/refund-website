import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { BorderRadiuses, Breakpoints, Spacings, Theme, TypographySizes } from './types';

const FONTS = {
  primary: 'IBM Plex Mono, monospace',
};

const BREAKPOINTS: Breakpoints = {
  xs: 450,
  sm: 668,
  md: 960,
  lg: 1280,
  xl: 1440,
};


export const whiteFontStyleHeading = { color: 'white', justifyContent: 'center'  };

const SPACINGS: Spacings = {
  xs: 4,
  sm: 8,
  smd: 12,
  md: 16,
  xmd: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
};

const BORDER_RADIUSES: BorderRadiuses = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 24,
};

const COLORS = {
  l1: '#0B3A89',
  l2: '#8098C2',
  l3: '#A2B8DE',
  l4: '#D4E2FA',
  l5: '#EAF1FC',
  l6: '#F4F6FB',
  bl1: '#0000F3',
  bl2: '#6262F6',
  bl3: '#9A9AFD',
  bl4: '#B7B8F9',
  bl5: '#C3C5FA',
  bl6: '#D0D1FA',
  d1: '#D4DFFB',
  d2: '#557DC0',
  d3: '#284B86',
  d4: '#152B53',
  d5: '#0F2346',
  d6: '#0C1930',
  d7: '#0B0B0B',
  bd1: '#D0D1FA',
  bd2: '#C3C5FA',
  bd3: '#B7B8F9',
  bd4: '#9A9AFD',
  bd5: '#6262F6',
  bd6: '#0000F3',
  g1: '#10A855',
  gr1: '#B3B3B3',
  gr2: '#FEFEFE',
  gr3: 'rgba(51, 51, 51, 0.5)',
  gr4: 'rgba(51, 51, 51, 1)',
  gr5: 'rgba(21, 21, 21, 0.5)',
  gr6: 'rgba(21, 21, 21, 1)',
  y1: '#7E6C00',
  white: '#ffffff',
  black: '#000000',
  linearBlack: 'linear-gradient(114.13deg, #151515 8.47%, #0B0B0B 88.44%)',
  error: '#E97181',
  highlight: '#8A8AFF',
};

export const TYPOGRAPHY_SIZES: TypographySizes = {
  H0: 28,
  H1: 24,
  H2: 20,
  H3: 16,
  H4: 14,
  H5: 12,
  H6: 10,
  H7: 8,
};

const LIGHT_THEME: Theme = {
  colors: {
    C0: COLORS.white,
    C1: COLORS.l1,
    C2: COLORS.l2,
    C3: COLORS.l3,
    C4: COLORS.l4,
    C5: COLORS.l5,
    C6: COLORS.l6,
    B1: COLORS.bl1,
    B2: COLORS.bl2,
    B3: COLORS.bl3,
    B4: COLORS.bl4,
    B5: COLORS.bl5,
    B6: COLORS.bl6,
    D7: COLORS.d7,
    G1: COLORS.g1,
    Y1: COLORS.y1,
    GR1: COLORS.gr1,
    GR2: COLORS.gr2,
    GR3: COLORS.gr3,
    GR4: COLORS.gr4,
    GR5: COLORS.gr5,
    GR6: COLORS.gr6,
    black: COLORS.black,
    linearBlack: COLORS.linearBlack,
    error: COLORS.error,
    highlight: COLORS.highlight,
  },
  fonts: FONTS,
  spacings: SPACINGS,
  breakpoints: BREAKPOINTS,
  typography: TYPOGRAPHY_SIZES,
  borderRadius: BORDER_RADIUSES,
};

export const AldrinThemeProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <ThemeProvider theme={LIGHT_THEME}>{children}</ThemeProvider>;
};
