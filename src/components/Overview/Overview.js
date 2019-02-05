import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import gearRequest from '../../helpers/data/gearRequest';
import formatPrice from '../../helpers/formatPrice';
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
      console.log({ gear: this.state.gear });
    })
      .catch(err => console.error('error with getting the gear', err));
  }


  render() {
    const { gear } = this.state;
    const gearByValue = gear.map(ascendingGear => {
      console.log(ascendingGear.price);
    });
    const totalValue = gear.reduce((acc, val) => {
      return val.price ? acc + val.price : acc;
    }, 0);
    const gearCount = gear.length;
    const averageGearValue = totalValue / gearCount;

    return (
      <div>
        <h1>Overview</h1>
        <h1>{formatPrice(totalValue)}</h1>
        <h1>{gearCount}</h1>
        <h1>{formatPrice(averageGearValue)}</h1>
        <ul>{gearByValue}</ul>
      </div>
    );
  }
}

export default Overview;
