import React, { PropsWithChildren } from 'react';
import StyledLink from '../styles/StyledLink';

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
