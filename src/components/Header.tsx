import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import assetsApi from '../store/api/AssetsApi';
import { useAppSelector } from '../store/store';
import StyledHeader from '../styles/StyledHeader';
import ButtonLink from './Link';

export default function Header() {
  const { sum, profit } = useAppSelector((store) => store.portfolio);
  const { data } = assetsApi.useFetchAllAssetsQuery({ offset: 0, limit: 3 }, {
    pollingInterval: 1000,
  });
  const topAssets = data?.data;

  const location = useLocation();

  return (
    <StyledHeader>
      {topAssets && (
        <div className="top-curr-container">
          {topAssets?.map((item) => (
            <Link to={`asset/${item.id}`} key={item.id}>
              <div className="top-curr">
                {item.name}
                <span
                  className={`top-curr-profit ${
                    +item.changePercent24Hr < 0 ? 'color-red' : 'color-green'
                  }`}
                >
                  {(+item.changePercent24Hr).toFixed(2)}
                  %
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div>
        {true ? (
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
