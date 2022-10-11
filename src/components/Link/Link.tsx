/* eslint-disable no-nested-ternary */
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
  background-color: ${(props) => (props.color === 'blue' ? '#4d94ff' : props.color === 'red' ? '#ff4d4d' : '#00b33c')};
  color: #fff;
  padding: 10px 10px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  text-transform: lowercase;
  border-radius: 5px;
`;

type ButtonLinkPropsType = {
  color: 'blue' | 'green' | 'red';
  path: string;
};

function ButtonLink({ color, path, children }: PropsWithChildren<ButtonLinkPropsType>) {
  return (
    <StyledLink data-testid="link" color={color} to={path}>
      {children}
    </StyledLink>
  );
}

export default ButtonLink;
