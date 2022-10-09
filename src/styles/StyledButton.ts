/* eslint-disable linebreak-style */
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => `var(--${props.color}-color)`};
  color: #fff;
  padding: 10px 10px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  text-transform: lowercase;
  border-radius: 5px;
  &:disabled {
    background-color: grey;
  }
`;

export default StyledButton;
