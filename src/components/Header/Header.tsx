import React from 'react';
import {
  Container,
} from './styles';
import { FlexBlock } from '../../styles';
import { whiteFontStyleHeading } from '../../theme';


export const Header: React.FC = () => {

  return (
        <FlexBlock $justifyContent='center' $direction='column'>
            <Container>
                <a href="/" style={{"justifyContent": "center"}}>
                    <img src={'/logo.svg'} />
                </a>
            </Container>
            <hr />
            <Container style={{justifyContent: 'center'}}>
                <h2 style = { whiteFontStyleHeading }>$PIKKA Refund</h2>
            </Container>
        </FlexBlock>
        
  );
};
