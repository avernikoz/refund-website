import styled from 'styled-components';
import { FlexBlock, InlineTextSC } from '../../styles';


export const WalletRow = styled(FlexBlock)`
  padding: ${(props) => props.theme.spacings.sm}px 0;
  cursor: pointer;
  background: transparent;
  border: none;
  font-family: ${(props) => props.theme.fonts.primary};
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  border-radius: ${(props) => props.theme.borderRadius.xmd}px;

  &:hover {
    background-color: ${(props) => props.theme.colors.BW4};

    ${InlineTextSC} {
      color: ${(props) => props.theme.colors.P1};
    }
  }

  &:active {
    background-color: ${(props) => props.theme.colors.BW3};

    ${InlineTextSC} {
      color: ${(props) => props.theme.colors.P4};
    }
  }
`;

export const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  margin-right: ${(props) => props.theme.spacings.md}px;
  margin-left: ${(props) => props.theme.spacings.xs}px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 75%;
    height: 75%;
    border-radius: ${(props) => props.theme.borderRadius.md}px;
  }
`;

export const NotConnectedContainer = styled.div`
  margin: auto 0;
`;

export const Container = styled.div`
  padding: ${(props) => props.theme.spacings.md}px 0;
`;

export const NoWalletBgBlock = styled.div`
  display: none;

  position: absolute;
  right: -26px;
  bottom: -26px;
  overflow: hidden;
  width: 550px;
  height: 550px;

  &:before {
    content: '';
    position: absolute;
    display: block;
    border: 395px solid ${(props) => props.theme.colors.P1};
    border-radius: 50%;
    width: 300px;
    height: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: block;
  }
`;

export const ConnectWalletButtonWrap = styled.div`
  max-width: 200px;
  margin-top: ${(props) => props.theme.spacings.lg}px;
`;

export const FlexBlockWithHeight = styled(FlexBlock)`
  height: 100%;
`;

export const NoImgContainer = styled.div`
  position: absolute;
  width: 45%;
  right: 0;
  top: ${(props) => props.theme.spacings.xl}px;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    display: block;
  }
`;

