import React from 'react';
import { withRouter } from 'react-router-dom';
import gearRequest from '../../helpers/data/gearRequest';
import reverb from '../images/reverb.png';
import ebay from '../images/ebay.png';
import craigslist from '../images/craigslist.png';
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
              <h3 className="singleview-h3">MANUFACTURER: {singleGear.manufacturer}</h3>
              <h3 className="singleview-h3">CONDITION: {singleGear.condition}</h3>
              <h3 className="singleview-h3">MODEL: {singleGear.model}</h3>
              <h3 className="singleview-h3">YEAR: {singleGear.year}</h3>
              <span className="link-buttons">
                <a href="https://reverb.com/sell/search" target="_blank"><img src={reverb} alt="reverb" className="reverb-button" /></a>
                <a href="https://www.ebay.com/sl/sell" target="_blank"><img src={ebay} alt="ebay" className="ebay-button" /></a>
                <a href="https://post.craigslist.org/k/aJOkRuwy6RG3ihYXbSECmQ/CfeTy?s=type" target="_blank"><img src={craigslist} alt="craigslist" className="craigslist-button" /></a>
              </span>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleView);
