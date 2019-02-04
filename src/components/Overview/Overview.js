import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import gearRequest from '../../helpers/data/gearRequest';
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
    // const { singleGear } = this.state;
    return (
      <div>
        <h1>Overview</h1>
      </div>
    );
  }
}

export default Overview;
