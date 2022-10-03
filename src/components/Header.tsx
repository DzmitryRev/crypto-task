import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { fetchTopRankAssets } from '../store/slices/ratingSlise';
import { useAppDispatch, useAppSelector } from '../store/store';
import Button from './Button';

const StyledHeader = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  .top-curr {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .top-curr-profit {
    font-weight: 500;
  }
  .color-red {
    color: #ff6060;
  }
  .color-green {
    color: #00a400;
  }
`;

export default function Header() {
  const dispatch = useAppDispatch();
  const { topRankAssets, loading, error } = useAppSelector((store) => store.rating);

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTopRankAssets());
  }, []);

  const [i, o] = useState(false);

  return (
    <StyledHeader>
      {error ? (
        <div />
      ) : (
        <div>
          {loading ? (
            ''
          ) : (
            topRankAssets.map((item) => (
              <Link to={`asset/${item.id}`}>
                <div key={item.id} className="top-curr">
                  {item.name}
                  {' '}
                  <span
                    className={`top-curr-profit ${
                      Number(item.changePercent24Hr) < 0 ? 'color-red' : 'color-green'
                    }`}
                  >
                    {Number(item.changePercent24Hr).toFixed(2)}
                    %
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
      <div>my profit</div>
      <div>
        <Link to={`${location.pathname}${location.pathname === '/' ? '' : '/'}portfolio`}>
          <Button
            color="blue"
            action={() => {
              o(!i);
            }}
          >
            portfolio
          </Button>
        </Link>
      </div>
    </StyledHeader>
  );
}
