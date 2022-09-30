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
`;

type ButtonProps = {
  color: 'blue' | 'green' | 'red',
  children: React.ReactNode,
  action?: () => void;
};

function Button({ color, action, children }: ButtonProps) {
  return (
    <StyledButton
      color={color}
      onClick={() => {
        if (action) action();
      }}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  action: () => {},
};

export default Button;
