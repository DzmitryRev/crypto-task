import styled from 'styled-components';

export const StyledModalContainer = styled.div`
  position: fixed;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export const StyledModal = styled.header`
  position: fixed;
  display: block;
  min-height: 224px;
  min-width: 320px;
  width: 560px;
  max-height: 90vh;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #c6c6c6;
  box-shadow: 0 0 10px 0 rgba(34, 60, 80, 0.2);
  padding: 30px 10px 10px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .close-button {
    position: absolute;
    right: 0;
    top: 0;
  }
  ::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: 600px) {
    width: 460px;
  }
  @media screen and (max-width: 500px) {
    width: 320px;
  }
`;
