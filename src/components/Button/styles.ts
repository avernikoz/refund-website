import styled, { css } from 'styled-components';

const VARIANTS = {
  primary: css`
    color: ${(props) => props.theme.colors.D7};
    background-color: ${(props) => props.theme.colors.GR2};
    backdrop-filter: blur(1px);
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.5);

    &:not(:disabled) {
      &:hover {
        background-color: ${(props) => props.theme.colors.GR1};
      }
      &:active {
        background-color: ${(props) => props.theme.colors.GR1};
      }
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.8;
    }
  `,
};

export const SIZES = {
  md: css`
    height: 48px;
    padding: 0 ${(props) => props.theme.spacings.md}px;
    border-radius: ${(props) => props.theme.borderRadius.xs}px;
  `,
  lg: css`
    height: 80px;
    border-radius: ${(props) => props.theme.borderRadius.xs}px;
    font-size: ${(props) => props.theme.typography.H2}px;
  `,
};

export interface ButtonProps {
  $size?: keyof typeof SIZES;
  $variant?: keyof typeof VARIANTS;
  $width?: string;
  $margin?: string;
  $height?: string;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: 0;
  padding: 0;
  max-width: 20em;
  cursor: pointer;
  min-height: 2em;
  font-family: ${(props) => props.theme.fonts.primary};
  ${(props: ButtonProps) => VARIANTS[props.$variant || 'primary']};
  ${(props: ButtonProps) => SIZES[props.$size || 'md']};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  outline: none;
  width: ${(props) => props.$width || 'auto'};
  margin: ${(props) => props.$margin || '0'};
  height: ${(props) => props.$height};
`;
