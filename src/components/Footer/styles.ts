import styled from 'styled-components';

export const Container = styled.footer`
  width: calc(100vw - ${(props) => props.theme.spacings.lg * 2}px);
  max-width: ${(props) => props.theme.breakpoints.lg}px;
  padding: ${(props) => props.theme.spacings.md}px 0;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    flex: 1;
  }

  h3 {
    display: none;
    padding: 0 20px;
    text-align: center;
    font-size: ${(props) => props.theme.typography.H5}px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: calc(100vw - ${(props) => props.theme.spacings.md * 2}px);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    h3 {
      display: inline;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 25px;

  a {
    display: block;
    margin-right: ${(props) => props.theme.spacings.md}px;

    &:hover {
      svg path {
        fill: ${(props) => props.theme.colors.GR1};
      }
    }
  }
`;
