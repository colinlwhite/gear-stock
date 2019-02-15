import React from 'react';
import { withRouter } from 'react-router-dom';
import gearRequest from '../../helpers/data/gearRequest';
import formatPrice from '../../helpers/formatPrice';
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
      <div className="singleview-container">
        <h1 className="singleview-title">{singleGear.name}</h1>
        <div className="row">
            <div className="col">
            <img className="single-image-view" src={singleGear.img} alt="gear card"/>
            </div>
            <div className="col">
              <h3>BRAND: {singleGear.brand}</h3>
              {/* <h3>EST VAL: {formatPrice(singleGear.price)}</h3> */}
              <h3>CONDITION: {singleGear.condition}</h3>
              <h3>MODEL: {singleGear.model}</h3>
              <h3>YEAR: {singleGear.year}</h3>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleView);
