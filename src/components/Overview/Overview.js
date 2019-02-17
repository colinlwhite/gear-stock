import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import gearRequest from '../../helpers/data/gearRequest';
import formatPrice from '../../helpers/formatPrice';
import Chart from '../PieChart/PieChart';
// import { withRouter } from 'react-router-dom';
import './Overview.scss';

class Overview extends React.Component {
  state = {
    gear: [],
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    gearRequest.getRequest(uid).then((gear) => {
      const sortedArray = [...gear].sort(function (a, b) {
        return b.price - a.price;
      });
      this.setState({ gear: sortedArray });
      // console.log({ gear: this.state.gear });
    })
      .catch(err => console.error('error with getting the gear', err));
  }


  render() {
    const { gear } = this.state;
    // const gearByValue = gear.map(ascendingGear => <ul key={ascendingGear.id}>{ascendingGear.price}</ul>);

    const gearByValue = gear.map(ascendingGear => (
      <div className="ascending-div">
          <h3 key={ascendingGear.id}>{ascendingGear.name}</h3>
          <h3>{formatPrice(ascendingGear.price)}</h3>
      </div>
    ));

    const totalValue = gear.reduce((acc, val) => {
      return val.price ? acc + val.price : acc;
    }, 0);
    const gearCount = gear.length;
    const averageGearValue = totalValue / gearCount;

    return (
      <div className="container-overview">
        <h1 className="overview-title">OVERVIEW</h1>
        
        <div className="row">
        <div className="total-value-div">
            <h1 className="cat-label">TOTAL VALUE</h1>
            <h2 className="total-val-num">{formatPrice(totalValue)}</h2>
        </div>

        <div className="piechart-value-div">
            <h1 className="cat-label">CATEGORY VALUES</h1>
            <Chart
            gear={gear}
            />
        </div>
        </div>

        <div className="row">
        <div className="count-div">
            <h1 className="cat-label">GEAR COUNT</h1>
            <h2 className="gear-count-num">{gearCount}</h2>
            <h3>Name</h3>
        </div>

        <div className="average-price-div">
            <h1 className="cat-label">AVERAGE PRICE</h1>
            <h2 className="avg-price-num">{formatPrice(averageGearValue)}</h2>
            <h3>Price</h3>
        </div>
        </div>
        
        <div className="by-value-div row">
          <ul>{gearByValue}</ul>
        </div>

      </div>
    );
  }
}

export default Overview;
