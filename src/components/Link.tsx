import React from 'react';
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
  children: React.ReactNode;
  path: string;
};

function ButtonLink({ color, path, children = '' }: ButtonPropsType) {
  return (
    <StyledLink color={color} to={path}>
      {children}
    </StyledLink>
  );
}

Link.defaultProps = {};

export default ButtonLink;
