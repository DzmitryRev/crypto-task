import React, { PropsWithChildren } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { StyledModal, StyledModalContainer } from './styles';
import useModal from '../../hooks/useModal';

function Modal({ children }: PropsWithChildren) {
  const { closeModal } = useModal();
  return (
    <>
      <StyledModalContainer data-testid="modal-shadow" aria-hidden="true" onClick={closeModal} />
      <StyledModal
        data-testid="modal"
        aria-hidden="true"
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
