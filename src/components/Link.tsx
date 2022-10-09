import React, { PropsWithChildren } from 'react';
import StyledLink from '../styles/StyledLink';

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
