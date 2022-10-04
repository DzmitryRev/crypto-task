import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { StorageAssetType } from '../services/localStorage.service';
import { AssetType } from '../store/assets.model';
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

type HeaderPropsType = { portfolio: StorageAssetType[]; assets: AssetType[] };

export default function Header({ portfolio, assets }: HeaderPropsType) {
  const dispatch = useAppDispatch();
  const { topRankAssets, loading, error } = useAppSelector((store) => store.rating);

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTopRankAssets());
  }, []);

  const [prev, setPrev] = useState(0);
  const [sum, setSum] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const prevSum = portfolio.reduce((accumulator, obj) => accumulator + obj.total, 0);
    let newSum = 0;
    portfolio.forEach((item) => {
      const newItem = assets.find((i) => i.id === item.asset.id);
      if (newItem) newSum += parseFloat(newItem?.priceUsd) * item.quantity;
    });
    setPrev(prevSum);
    setSum(newSum);
    setProfit(newSum - prevSum);
  }, [portfolio, assets]);

  console.log(assets);

  return (
    <StyledHeader>
      {error ? (
        <div />
      ) : (
        <div>
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
        {portfolio.length ? (
          <h4>
            {sum.toFixed(2)}
            <div>
              {profit.toFixed(2) || ''}
              (
              {`${((profit / prev) * 100).toFixed(2)}%` || ''}
              )
            </div>
          </h4>
        ) : (
          ''
        )}
      </div>
      <div>
        <Link to={`${location.pathname}${location.pathname === '/' ? '' : '/'}portfolio`}>
          <Button color="blue">portfolio</Button>
        </Link>
      </div>
    </StyledHeader>
  );
}
