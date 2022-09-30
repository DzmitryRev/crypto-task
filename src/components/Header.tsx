import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledHeader = styled.header`
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function Header() {
  // Selector from Main page reducer and get top 3 currencies
  // Selector from Portdolio page reducer and get calculated values
  return (
    <StyledHeader>
      <div>
        top 3 currencies
      </div>
      <div>
        my profit
      </div>
      <div>
        <Button color="blue">
          portfolio
        </Button>
      </div>
    </StyledHeader>
  );
}
