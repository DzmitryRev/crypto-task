import React from 'react';
import { Line } from 'react-chartjs-2';
import { HistoryType } from '../../store/assets.model';
import StyledChart from './StyledChart';
import { chartOptions, createChartData } from '../../services/chart.service';

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
