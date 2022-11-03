import styled from "styled-components";
import Variables from "../../styles/variables";

const StyledHeader = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  .top-curr-container {
    @media screen and (max-width: ${Variables.bp.m}px) {
      display: none;
    }
  }
  .top-curr {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .top-curr-profit {
    font-weight: 500;
  }
  .color-red {
    color: #ff6060;
  }
  .color-green {
    color: #00a400;
  }
`;

export default StyledHeader;
