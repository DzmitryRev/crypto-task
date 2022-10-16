import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useModal() {
  const navigate = useNavigate();

  document.body.style.overflow = 'hidden';

  const closeModal = () => {
    navigate(-1);
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
