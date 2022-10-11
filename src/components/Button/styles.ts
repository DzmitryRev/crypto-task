/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.color === 'blue' ? '#4d94ff' : props.color === 'red' ? '#ff4d4d' : '#00b33c')};
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
