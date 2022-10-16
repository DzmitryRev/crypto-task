import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

export const StyledLoadingContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const StyledLoading = styled(CircularProgress)`
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
`;
