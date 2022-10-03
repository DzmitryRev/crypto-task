import {
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';
import styled from 'styled-components';
import zoomPlugin from 'chartjs-plugin-zoom';
import { HistoryType } from '../store/assets.model';

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

const StyledChart = styled.div`
  max-width: 1000px;
  min-height: 350px;
  margin: 0 auto;
`;

type ChartPropsType = {
  history: HistoryType[];
};

function Chart({ history }: ChartPropsType) {
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
    <StyledChart>
      <Line options={options} data={data} />
    </StyledChart>
  );
}

export default Chart;
