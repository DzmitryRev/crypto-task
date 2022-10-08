import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
  background-color: ${(props) => `var(--${props.color}-color)`};
  color: #fff;
  padding: 10px 10px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  text-transform: lowercase;
  border-radius: 5px;
`;

type ButtonPropsType = {
  color: 'blue' | 'green' | 'red';
  path: string;
};

function ButtonLink({ color, path, children = '' }: PropsWithChildren<ButtonPropsType>) {
  return (
    <StyledLink color={color} to={path}>
      {children}
    </StyledLink>
  );
}

export default ButtonLink;
