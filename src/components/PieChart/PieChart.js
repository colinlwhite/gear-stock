import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import './PieChart.scss';

class Chart extends React.Component {
  render() {
    const { gear } = this.props;
    const forTheChart = {};

    gear.forEach((GearItem) => {
      if (!forTheChart[GearItem.categoryData]) {
        forTheChart[GearItem.categoryData] = {
          name: GearItem.categoryDisplay,
          value: GearItem.price,
        };
      } else {
        forTheChart[GearItem.categoryData].value += GearItem.price;
      }
    });

    const chartDisplay = [];

    for (const chartItem in forTheChart) {
      chartDisplay.push(forTheChart[chartItem]);
    }

    return (
      <div className="pie-chart-div">
        <PieChart width={400} height={400}>
          <Pie
            isAnimationActive={false}
            data={chartDisplay}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#BEC0C2"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    );
  }
}

export default Chart;