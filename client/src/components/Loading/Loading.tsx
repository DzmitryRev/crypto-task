import { StyledLoading, StyledLoadingContainer } from './StyledLoading';

function Loading() {
  return (
    <StyledLoadingContainer>
      <StyledLoading data-testid="loading" />
    </StyledLoadingContainer>

  );
}

export default Loading;
