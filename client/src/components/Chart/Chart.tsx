import { Line } from 'react-chartjs-2';
import StyledChart from './StyledChart';
import { chartOptions, createChartData } from '../../services/chart.service';
import { HistoryType } from '../../types/types';

type ChartPropsType = {
  history: HistoryType[];
};

function Chart({ history }: ChartPropsType) {
  const data = createChartData(history);
  return (
    <StyledChart>
      <Line options={chartOptions} data={data} />
    </StyledChart>
  );
}

export default Chart;
