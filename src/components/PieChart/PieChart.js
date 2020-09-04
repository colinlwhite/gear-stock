import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import './PieChart.scss';

class Chart extends React.Component {
  render() {
    const { gear } = this.props;
    const forTheChart = {};

    gear.forEach((GearItem) => {
      if (!forTheChart[GearItem.categoryData]) {
        forTheChart[GearItem.categoryData] = {
          // The chart only cares about a name value pair
          // We are populating the name value pair with information from GearItem
          name: GearItem.categoryDisplay,
          value: GearItem.price,
        };
      } else {
        // If 
        forTheChart[GearItem.categoryData].value += GearItem.price;
      }
    });

    const chartDisplay = [];

    for (const chartItem in forTheChart) {
      chartDisplay.push(forTheChart[chartItem]);
    }

    // At this point we have the data like we want it


    // return (
    //   <div className="pie-chart-div">
    //     <PieChart width={400} height={400}>
    //       <Pie
    //         isAnimationActive={false}
    //         data={chartDisplay}
    //         cx={200}
    //         cy={200}
    //         outerRadius={80}
    //         fill="#BEC0C2"
    //         label
    //       />
    //       <Tooltip />
    //     </PieChart>
    //   </div>
    // );


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff0d00'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (
      { cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="pink" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    
    // const SimplePieChart = React.createClass({
    // render () {
    return (
      <ResponsiveContainer width={700} height="80%" className="keep-working" >
      {/* // <div className="pie-chart-div"> */}
          <PieChart className="recharts-element" width={400} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={chartDisplay}
              cx={300}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              className="pie-itself"
            >
              {
                chartDisplay.map((entry, index) => <Cell className="cell-element" fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
          </PieChart>
      {/* </div> */}
      </ResponsiveContainer>
    );
      // }
   //  })
    


  }
}

export default Chart;
