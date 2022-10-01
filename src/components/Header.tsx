import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fetchTopRankAssets } from '../store/slices/ratingSlise';
import { useAppDispatch, useAppSelector } from '../store/store';
// import { useAppSelector } from '../store/store';
import Button from './Button';

const StyledHeader = styled.header`
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function Header() {
  const dispatch = useAppDispatch();
  const { topRankAssets, loading, error } = useAppSelector((store) => store.rating);

  useEffect(() => {
    dispatch(fetchTopRankAssets());
  }, []);

  return (
    <StyledHeader>
      {error ? <div /> : (
        <div>
          {loading ? 'Loading...' : topRankAssets.map((item) => <div key={item.id}>{item.id}</div>)}
        </div>
      )}
      <div>
        my profit
      </div>
      <div>
        <Button color="blue">
          portfolio
        </Button>
      </div>
    </StyledHeader>
  );
}
