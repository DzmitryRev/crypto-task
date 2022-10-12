import React, { PropsWithChildren } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { StyledModal, StyledModalShadow } from './StyledModal';
import useModal from '../../hooks/useModal';

type ModalProps = {
  type: 'default' | 'minify';
};

function Modal({ type, children }: PropsWithChildren<ModalProps>) {
  const { closeModal } = useModal();
  return (
    <>
      <StyledModalShadow data-testid="modal-shadow" aria-hidden="true" onClick={closeModal} />
      <StyledModal
        data-testid="modal"
        aria-hidden="true"
        type={type}
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
