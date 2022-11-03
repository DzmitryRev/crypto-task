/* eslint-disable import/no-relative-packages */
/* eslint-disable import/extensions */
import { Line } from "react-chartjs-2";
import { HistoryType } from "../../../../new-server/src/types/types";
import StyledChart from "./StyledChart";
import { chartOptions, createChartData } from "../../services/chart.service";

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
