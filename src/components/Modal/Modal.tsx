import React, { PropsWithChildren } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { StyledModal, StyledModalContainer } from './styles';
import useModal from '../../hooks/useModal';

type ModalPropsType = {
  isOpen: boolean;
  closeCallback: () => void;
};

function Modal({ isOpen, closeCallback, children }: PropsWithChildren<ModalPropsType>) {
  const { closeModal } = useModal(isOpen, closeCallback);
  return (
    <>
      <StyledModalContainer
        data-testid="modal-shadow"
        aria-hidden={isOpen}
        onClick={closeModal}
      />
      <StyledModal
        data-testid="modal"
        aria-hidden={isOpen}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <div className="close-button">
          <ClearIcon
            data-testid="modal-close-btn"
            fontSize="large"
            color="inherit"
            onClick={closeModal}
          />
        </div>
      </StyledModal>
    </>
  );
}

export default Modal;
