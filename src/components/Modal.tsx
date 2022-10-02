import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';

const StyledModalContainer = styled.div`
  position: fixed;
  display: ${(props) => (props['aria-hidden'] === true ? 'block' : 'none')};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  opacity: 0.3;
  cursor: pointer;
`;

const StyledModal = styled.header`
  position: fixed;
  display: ${(props) => (props['aria-hidden'] === true ? 'block' : 'none')};
  min-height: 300px;
  min-width: 300px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #c6c6c6;
  box-shadow: 0 0 10px 0 rgba(34, 60, 80, 0.2);
  padding: 30px 20px 20px 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .close-btn{
    position: absolute;
    right: 0;
    top: 0;
  }
`;

type ModalPropsType = {
  isOpen: boolean
  closeCallback: () => void
};

export default function Modal({ isOpen, closeCallback }: ModalPropsType) {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }
  const closeModal = () => {
    closeCallback();
    document.body.style.overflow = 'auto';
  };
  return (
    <>
      <StyledModalContainer aria-hidden={isOpen} onClick={closeModal} />
      <StyledModal
        aria-hidden={isOpen}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Modal
        <div className="close-btn">
          <ClearIcon fontSize="large" color="inherit" onClick={closeModal} />
        </div>
      </StyledModal>
    </>
  );
}
