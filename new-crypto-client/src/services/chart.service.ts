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
import zoomPlugin from 'chartjs-plugin-zoom';
import type { HistoryType } from 'crypto-server/src/types/types';

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

export const chartOptions: ChartOptions<'line'> = {
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

export type ChartDataType = {
  labels: string[];
  datasets: {
    fill: boolean;
    label: string;
    data: string[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

export function createChartData(history: HistoryType[]): ChartDataType {
  const data: ChartDataType = {
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

  return data;
}
