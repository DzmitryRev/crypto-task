import React from 'react';
import styled from 'styled-components';
// import { useAppSelector } from '../store/store';
import Button from './Button';

const StyledHeader = styled.header`
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function Header() {
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
