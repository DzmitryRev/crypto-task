import { HistoryType } from '../../types/types';
import { ChartDataType, createChartData } from '../chart.service';

const mockHistory: HistoryType[] = [
  { date: '2021-10-14T00:00:00.000Z', priceUsd: '10', time: 1634169600000 },
  { date: '2021-10-14T00:00:00.000Z', priceUsd: '20', time: 1634169600000 },
];

test('Should return the data obj. (ChartDataType)', () => {
  const result: ChartDataType = {
    labels: ['14.10.2021', '14.10.2021'],
    datasets: [
      {
        fill: true,
        label: 'Price',
        data: ['10', '20'],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  expect(createChartData(mockHistory)).toEqual(result);
});
