import styled from "styled-components";
import { FlexBlockProps, ThemeColors, TypographyProps } from "./types";

export const Flex = styled.div`
  display: flex;
`;

export const FlexBlock = styled(Flex)<FlexBlockProps>`
  flex-direction: ${(props: FlexBlockProps) => props.$direction || 'row'};
  justify-content: ${(props: FlexBlockProps) =>
    props.$justifyContent || 'normal'};
  align-items: ${(props: FlexBlockProps) => props.$alignItems || 'normal'};
  ${(props: FlexBlockProps) => (props.$flex ? `flex: ${props.$flex};` : '')}
`;

export const TextSC = styled.p<TypographyProps>`
  font-family: ${(props) => props.theme.fonts[props.$fontFamily || 'primary']};
  font-size: ${(props) => props.theme.typography[props.$fontSize || 'H3']}px;
  font-weight: ${(props) => props.$fontWeight || 400};

  margin: ${(props) => props.$margin || '0.5em 0'};

  text-align: ${(props) => props.$textAlign || 'left'};
  line-height: ${(props) => props.$lineHeight || 1.5};

  color: ${(props) => props.theme.colors[props.$color || 'BW1']};

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  ${(props) =>
    props.$hoverColor &&
    `
    &:hover {
      color: ${props.theme.colors[props.$hoverColor]};
    }`}

  & blockquote {
    margin: 0 1em;
  }

  & a {
    color: ${(props) => props.theme.colors.P1};
    transition: ${(props) => props.theme.transitions.default};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.P3};
    }
  }
`;

export const FlexFull = styled(FlexBlock)`
    width: 100%;
`;

export const InlineTextSC = styled(TextSC).attrs({ as: 'span' })`
  text-decoration: none;
  margin: 0;
  cursor: ${(props) => (props.$needPointer ? 'pointer' : 'auto')};
  white-space: ${(props) => props.$whiteSpace};
`;


export const Card = styled.div<{ $background?: keyof ThemeColors }>`
  background: ${props => props.theme.colors[props.$background || 'GR5']};
  border-radius: ${props => props.theme.borderRadius.xs}px;
  box-shadow: 12px 20px 0px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

export const PlainInput = styled.input`
  border: none;
  width: 100%;
  font-size: 15px;
  background: #fff;
  font-family: ${(props) => props.theme.fonts.primary};
  outline: none;
  color: ${(props) => props.theme.colors.D7};
  &::placeholder {
    color: ${(props) => props.theme.colors.GR1};
  }
  @media (max-width: 768px) {
    width: 90%
  }
`;

export const ResponsiveFlex = styled(FlexBlock)`
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Separator = styled.div`
  height: 30em;
  width: 2px;
  margin-left: 1em;
  margin-right: 1em;
  @media (max-width: 768px) {
    height: 2px;
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  background-color: #fff;
`;


export const MainPageCard = styled(Card)`
  padding: 2rem;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;