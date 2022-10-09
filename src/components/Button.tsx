import React, { PropsWithChildren } from 'react';
import StyledButton from '../styles/StyledButton';

type ButtonPropsType = {
  color: 'blue' | 'green' | 'red';
  action?: () => void;
  disabled?: boolean;
};

function Button({
  color, action = () => {}, disabled = false, children,
}: PropsWithChildren<ButtonPropsType>) {
  return (
    <StyledButton
      color={color}
      onClick={() => {
        if (action) action();
      }}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  action: () => {},
  disabled: false,
};

export default Button;
