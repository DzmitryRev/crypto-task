import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTopRankAssets } from '../store/slices/ratingSlise';
import { useAppDispatch, useAppSelector } from '../store/store';
import Button from './Button';
import Modal from './Modal';

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

  const [i, o] = useState(false);

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
        <Button color="blue" action={() => { o(!i); }}>
          portfolio
        </Button>
      </div>
      <Modal isOpen={i} closeCallback={() => { o(false); }} />
    </StyledHeader>
  );
}
