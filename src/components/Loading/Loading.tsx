import { CircularProgress } from '@mui/material';
import React from 'react';
import StyledLoadingContainer from './styles';

function Loading() {
  return (
    <StyledLoadingContainer>
      <CircularProgress data-testid="loading" className="loading-gif" />
    </StyledLoadingContainer>
  );
}

export default Loading;