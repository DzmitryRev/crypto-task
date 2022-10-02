import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div`
  .loading-gif {
    position: absolute;
    top: 50%;
    left: calc(50% - 15px);
  }
`;

function Loading() {
  return (
    <StyledLoadingContainer>
      <CircularProgress className="loading-gif" />
    </StyledLoadingContainer>
  );
}

export default Loading;
