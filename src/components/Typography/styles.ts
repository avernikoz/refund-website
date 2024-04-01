import styled from 'styled-components';
import { TYPOGRAPHY_SIZES } from '../../theme';
import { ThemeColors } from '../../types';

interface TypographyProps {
  $fontSize?: keyof typeof TYPOGRAPHY_SIZES;
  $lineHeight?: keyof typeof TYPOGRAPHY_SIZES;
  $color?: keyof ThemeColors;
  $fontWeight?: 100 | 400 | 500 | 600 | 700;
  $textAlign?: 'left' | 'center' | 'right';
  $marginBottom?: 0 | 5 | 10 | 20 | 30 | 40;
  $width?: 'initial';
}

export const Text = styled.p<TypographyProps>`
  font-size: ${(props) => props.theme.typography[props.$fontSize || 'H3']}px;
  font-weight: ${(props) => props.$fontWeight || 400};
  color: ${(props) => props.theme.colors[props.$color || 'GR1']};
  text-align: ${(props) => props.$textAlign || 'left'};
  line-height: ${(props) =>
    props.theme.typography[props.$lineHeight || props.$fontSize || 'H3']}px;
  margin-bottom: ${(props) => props.$marginBottom || 0}px;
  width: ${(props) => props.$width}px;
`;

export const InlineText = styled(Text).attrs<TypographyProps>({})``;
