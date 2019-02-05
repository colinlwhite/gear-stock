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
      this.setState({ gear });
      console.log({ gear });
    })
      .catch(err => console.error('error with getting the gear', err));
  }


  render() {
    const { gear } = this.state;
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
      </div>
    );
  }
}

export default Overview;
