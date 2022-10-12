/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Variables from '../../styles/variables';

const StyledButton = styled.button`
  background-color: ${(props) => (props.color === 'blue'
    ? Variables.colors.blue
    : props.color === 'red'
      ? Variables.colors.red
      : Variables.colors.green)};
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
