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

export function createChartData(history: HistoryType[]) {
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

  return data;
}
