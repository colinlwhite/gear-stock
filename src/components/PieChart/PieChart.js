import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import './PieChart.scss';

class Chart extends React.Component {
  render() {
    const { gear } = this.props;
    const pieChartNameValueObject = {};

    gear.forEach((GearItem) => {
      if (!pieChartNameValueObject[GearItem.categoryData]) {
      // if (pieChartNameValueObject[GearItem.categoryData] = false) {
        pieChartNameValueObject[GearItem.categoryData] = {
          name: GearItem.categoryDisplay,
          value: GearItem.price,
        };
      } else {
        pieChartNameValueObject[GearItem.categoryData].value += GearItem.price;
      }
    });

    const chartDisplay = [];

    for (const chartItem in pieChartNameValueObject) {
      chartDisplay.push(pieChartNameValueObject[chartItem]);
    }

    const COLORS = [
      '#34ace0', '#ff793f', '#b8e994',
      '#474787', '#f7f1e3', '#218c74',
      '#b33939', '#ffda79', '#eb2f06',
      '#3c6382', '#95a5a6', '#fab1a0',
      '#34495e'];

    return (
        <PieChart width={400} height={400}>
          <Pie
            isAnimationActive={false}
            data={chartDisplay}
            cx={200}
            cy={200}
            outerRadius={135}
            fill="#BEC0C2"
            label>
          {
            chartDisplay.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
          <Tooltip />
        </PieChart>
    );
  }
}

export default Chart;
