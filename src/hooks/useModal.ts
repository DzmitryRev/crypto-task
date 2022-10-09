import { useEffect } from 'react';

function useModal(isOpen: boolean, closeCallback: () => void) {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }
  const closeModal = () => {
    closeCallback();
    document.body.style.overflow = 'auto';
  };

  useEffect(
    () => () => {
      document.body.style.overflow = 'auto';
    },
    [],
  );

  return { closeModal };
}

export default useModal;
