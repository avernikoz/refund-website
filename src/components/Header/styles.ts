import styled from 'styled-components';
import { Button } from '../Button';

export const MenuContainer = styled.div`
  flex: 1;
`;

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacings.sm}px 0 0 0;

  ${MenuContainer} {
    margin: 25px 0;
  }

  > * {
    flex: 1;
    display: flex;
    flex-direction: row;
  }

  width: calc(100vw - ${(props) => props.theme.spacings.lg * 2}px);
  max-width: ${(props) => props.theme.breakpoints.lg}px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: calc(100vw - ${(props) => props.theme.spacings.md * 2}px);
    flex-direction: column;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    & {
      flex-direction: row;
      padding: ${(props) => props.theme.spacings.md}px 0;
    }

    ${MenuContainer} {
      margin: 0;
    }
  }
`;

export const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

export const ConnectedWalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const DisconnectButton = styled(Button)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
`;

