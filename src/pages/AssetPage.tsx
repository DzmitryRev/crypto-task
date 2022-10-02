import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Link, useParams } from 'react-router-dom';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { fetchAsset } from '../store/slices/assetSlise';
import { useAppDispatch, useAppSelector } from '../store/store';

const A = styled.div`
  max-width: 1000px;
  min-height: 350px;
  margin: 0 auto;
`;

const StyledConentContainer = styled.div`
  padding: 0 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: 500;
  }
  @media screen and (max-width: 868px) {
    padding: 0;
  }
  @media screen and (max-width: 498px) {
    flex-direction: column;
    align-items: start;
    .back-link, .change-block{
        margin-bottom: 10px;
    }
  }
`;

type AssetPagePropsType = {
  children?: React.ReactNode;
};

type Test = {
  date: string;
  priceUsd: string;
  time: number;
};

function AssetPage({ children }: AssetPagePropsType) {
  const { assetId } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, asset } = useAppSelector((store) => store.asset);
  const [history, setHistory] = useState<Test[]>([]);
  useEffect(() => {
    dispatch(fetchAsset(assetId as string));
    axios
      .get<{ data: Test[]; timestamp: number }>(
      `https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`,
    )
      .then((res) => {
        setHistory(res.data.data);
      });
  }, [assetId]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    zoomPlugin,
  );

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          pinch: {
            enabled: true,
          },
          wheel: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
  };

  const data = {
    labels: history.map((item) => new Date(item.time).toLocaleDateString()),
    datasets: [
      {
        fill: true,
        label: 'Price',
        data: history.map((item) => item.priceUsd),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>
      {error ? (
        <div>error</div>
      ) : (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <StyledConentContainer>
              <Link to="/" className="back-link">
                <Button color="red">back</Button>
              </Link>
              <h2>
                {asset?.name || '...'}
                (
                {asset?.symbol || '...'}
                )
              </h2>
              <p>
                {Number(asset?.priceUsd).toFixed(2)}
                $
              </p>
              <p className="change-block">
                {Number(asset?.changePercent24Hr).toFixed(2)}
                %
              </p>
              <Link to={`buy/${assetId}`}>
                <Button color="green">add</Button>
              </Link>
            </StyledConentContainer>
          )}
        </div>
      )}
      <A>
        <Line options={options} data={data} />
      </A>
      {children}
    </div>
  );
}

AssetPage.defaultProps = {
  children: '',
};

export default AssetPage;
