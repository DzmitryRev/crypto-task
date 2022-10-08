import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTopRankAssets } from '../store/slices/ratingSlise';
import { useAppDispatch, useAppSelector } from '../store/store';
import StyledHeader from '../styles/header';
import ButtonLink from './Link';

export default function Header() {
  const dispatch = useAppDispatch();
  const { topRankAssets, loading, error } = useAppSelector((store) => store.rating);
  const { sum, profit } = useAppSelector((store) => store.portfolio);

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTopRankAssets());
  }, []);

  return (
    <StyledHeader>
      {error ? (
        <div />
      ) : (
        <div className="top-curr-container">
          {loading
            ? ''
            : topRankAssets.map((item) => (
              <Link to={`asset/${item.id}`} key={item.id}>
                <div className="top-curr">
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
            ))}
        </div>
      )}
      <div>
        {sum ? (
          <h4>
            {sum.toFixed(2)}
            <div>
              {profit.toFixed(2) || ''}
              (
              {`${((profit / sum) * 100).toFixed(2)}%` || ''}
              )
            </div>
          </h4>
        ) : (
          ''
        )}
      </div>
      <div>
        <ButtonLink
          color="blue"
          path={`${location.pathname}${location.pathname === '/' ? '' : '/'}portfolio`}
        >
          portfolio
        </ButtonLink>
      </div>
    </StyledHeader>
  );
}
