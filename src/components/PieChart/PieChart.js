import React from 'react';
import {
  PieChart, Pie, Tooltip, Cell,
} from 'recharts';
import './PieChart.scss';

class Chart extends React.Component {
  render() {
    const { gear } = this.props;
    const pieChartNameValueObject = {};

    gear.forEach((GearItem) => {
      if (!pieChartNameValueObject[GearItem.categoryData]) {
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
    const pieChartColors = [
      '#34ace0', '#ff793f', '#b8e994',
      '#474787', '#f7f1e3', '#218c74',
      '#b33939', '#ffda79', '#eb2f06',
      '#3c6382', '#95a5a6', '#fab1a0',
      '#34495e'];

    return (
        <PieChart width={400} height={400}>
          <Pie
            data={chartDisplay}
            cx={200}
            cy={200}
            outerRadius={135}
            >
          {
            chartDisplay.map((entry, index) => <Cell fill={pieChartColors[index % pieChartColors.length]}/>)
          }
          </Pie>
          <Tooltip />
        </PieChart>
    );
  }
}

export default Chart;
