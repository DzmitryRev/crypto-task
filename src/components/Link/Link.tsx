import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import StyledButton from '../Button/StyledButton';

type ButtonLinkPropsType = {
  color: 'blue' | 'green' | 'red';
  path: string;
};

function ButtonLink({ color, path, children }: PropsWithChildren<ButtonLinkPropsType>) {
  return (
    <StyledButton as={Link} data-testid="link" color={color} to={path}>
      {children}
    </StyledButton>
  );
}

export default ButtonLink;
