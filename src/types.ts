import { TYPOGRAPHY_SIZES } from "./theme";

type Alignment =
| 'normal'
| 'center'
| 'flex-start'
| 'end'
| 'flex-start'
| 'flex-end'
| 'left'
| 'right'
| 'space-between';

export interface FlexBlockProps {
  $direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  $justifyContent?: Alignment
  $alignItems?: Alignment
  $flex?: string
}

export interface ThemeColors {
  C0: string;
  C1: string;
  C2: string;
  C3: string;
  C4: string;
  C5: string;
  C6: string;
  B1: string;
  B2: string;
  B3: string;
  B4: string;
  B5: string;
  B6: string;
  D7: string;
  G1: string;
  GR1: string;
  GR2: string;
  GR3: string;
  GR4: string;
  GR5: string;
  GR6: string;
  Y1: string;
  black: string;
  linearBlack: string;
  error: string;
  highlight: string;
}

export interface ThemeFonts {
  primary: string;
}

export interface Breakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export interface Spacings {
  xs: number
  sm: number
  smd: number
  md: number
  xmd: number
  lg: number
  xl: number
  xxl: number
}

export interface BorderRadiuses {
  xs: number
  sm: number
  md: number
  lg: number
}

export interface TypographySizes {
  H0: number
  H1: number
  H2: number
  H3: number
  H4: number
  H5: number
  H6: number
  H7: number
}

export interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
  breakpoints: Breakpoints
  spacings: Spacings
  typography: TypographySizes
  borderRadius: BorderRadiuses
}

export interface TypographyProps {
  $fontSize?: keyof typeof TYPOGRAPHY_SIZES;
  $color?: keyof ThemeColors;
  $hoverColor?: keyof ThemeColors;
  $fontFamily?: keyof ThemeFonts;
  $fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  $textAlign?: 'left' | 'center' | 'right';
  $lineHeight?: number;
  $needPointer?: boolean;
  $margin?: string;
  $whiteSpace?: string;
}