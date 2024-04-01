import React from 'react';
import {
  Container,
} from './styles';
import { FlexBlock } from '../../styles';
import { whiteFontStyleHeading } from '../../theme';


export const Header: React.FC = () => {

  return (
        <FlexBlock $justifyContent='center' $direction='column'>
            <Container style={{margin: '0 auto'}}>
                <a href="/">
                    <img style={{margin: '0 auto'}} src={'/logo.svg'} />
                </a>
            </Container>
            <hr />
            <Container style={{margin: '0 auto'}}>
                <h2 style = { whiteFontStyleHeading }>$PIKKA Refund</h2>
            </Container>
        </FlexBlock>
        
  );
};
