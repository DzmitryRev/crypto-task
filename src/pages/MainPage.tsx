/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AssetField from '../components/AssetField';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { fetchAssets, setOffset } from '../store/slices/assetsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { StyledError } from '../styles/wrapper';

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const StyledTable = styled.table`
  margin: 0 auto;
  font-weight: 500;
  font-size: 20px;
  line-height: 48px;

  thead {
    font-weight: 700;
  }
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 15px;
    white-space: nowrap;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .name-td {
    max-width: 250px;
    min-width: 200px;
    cursor: pointer;
    &:hover {
      background-color: rgba(103, 77, 232, 0.3);
    }
  }
  .price-td,
  .change-td {
    max-width: 100px;
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .price-td,
  .change-td,
  .symbol-td,
  .symbol-td-head,
  .price-td-head,
  .profit-td-head {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
`;

type MainPagePropsType = {
  children?: React.ReactNode;
};

function MainPage({ children = '' }: MainPagePropsType) {
  const dispatch = useAppDispatch();
  const {
    loading, error, assets, offset,
  } = useAppSelector((store) => store.assets);

  useEffect(() => {
    dispatch(fetchAssets(offset));
  }, [offset]);

  return (
    <div>
      {error ? (
        <StyledError>
          <h4>Something went wrong</h4>
        </StyledError>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {' '}
          <StyledTable>
            <thead>
              <tr>
                <td>Name</td>
                <td className="symbol-td-head">Symbol</td>
                <td className="price-td-head">Price $</td>
                <td className="profit-td-head">Profit %</td>
              </tr>
            </thead>
            <tbody>
              {assets.map((item) => (
                <AssetField
                  key={item.id}
                  id={item.id}
                  price={item.priceUsd}
                  name={item.name}
                  changePerDay={item.changePercent24Hr}
                  symbol={item.symbol}
                />
              ))}
            </tbody>
          </StyledTable>
          <StyledPagination>
            <Button
              color="green"
              action={() => {
                dispatch(setOffset(offset - 50));
              }}
              disabled={!offset}
            >
              {'<'}
            </Button>
            <Button
              color="green"
              action={() => {
                dispatch(setOffset(offset + 50));
              }}
            >
              {'>'}
            </Button>
          </StyledPagination>
        </>
      )}
      {children}
    </div>
  );
}

MainPage.defaultProps = {
  children: '',
};

export default MainPage;
