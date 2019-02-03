import React from 'react';
import { withRouter } from 'react-router-dom';
import gearRequest from '../../helpers/data/gearRequest';
import './SingleView.scss';

class SingleView extends React.Component {
  state = {
    singleGear: [],
  }

  componentDidMount() {
    const singleViewId = this.props.match.params.id;
    gearRequest.getSingleGear(singleViewId)
      .then((gear) => {
        this.setState({ singleGear: gear.data });
      })
      .catch(err => console.error('error with getSingleListing', err));
  }

  render() {
    const { singleGear } = this.state;
    return (
      <div>
        <h2>{singleGear.name}</h2>
      </div>
    );
  }
}

export default withRouter(SingleView);
