import React from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip
} from 'recharts';


const data01 = [{name: 'Drums & Percussion', value: 40}, {name: 'Home Audio', value: 30},
  {name: 'Electric Guitars', value: 30}, {name: 'Band and Orchestra', value: 20},
  {name: 'Acoustic Guitars', value: 27}, {name: 'Keyboards and Synths', value: 18}]

const data02 = [{name: '1970s', value: 24}, {name: '1990s', value: 45},
  {name: '1940s', value: 13}, {name: '2010s', value: 98},
  {name: '1980s', value: 39}, {name: 'mid-2000s', value: 48}];

// Add another key value pair to my data
// Maybe change my current category key to 'categoryDisplay'
// Make what I'm looping over in the piechart 'categoryData'
// Once I create my object from Luke's function I need to turn it into 1 array of multiple objects

class Chart extends React.Component {


  render() {
    const { gear } = this.props;
    const forTheChart = {};

    gear.forEach((GearItem) => {
      // does the forTheChart.drum exist?
      if (!forTheChart[GearItem.categoryData]) {
        forTheChart[GearItem.categoryData] = {
          'name': GearItem.categoryDisplay,
          'value': GearItem.price
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
      <div>
    <PieChart width={800} height={400}>
        <Pie isAnimationActive={false} data={chartDisplay} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
        <Tooltip/>
      </PieChart>
       </div>
    );
  }

}

export default Chart;
