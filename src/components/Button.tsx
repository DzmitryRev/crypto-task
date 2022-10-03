import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => `var(--${props.color}-color)`};
  color: #fff;
  padding: 10px 10px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  text-transform: lowercase;
  border-radius: 5px;
  &:disabled {
    background-color: grey;
  }
`;

type ButtonPropsType = {
  color: 'blue' | 'green' | 'red';
  disabled?: boolean;
  children: React.ReactNode;
  action?: () => void;
};

function Button({
  color, action, disabled = false, children,
}: ButtonPropsType) {
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
