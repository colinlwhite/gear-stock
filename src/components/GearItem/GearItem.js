import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import formatPrice from '../../helpers/formatPrice';
import './GearItem.scss';

class GearItem extends React.Component {
  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleGear, gearstock } = this.props;
    deleteSingleGear(gearstock.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { gearstock } = this.props;
    const getId = gearstock.id;
    this.props.history.push(`/edit/${getId}`);
  }

  singleViewEvent = (e) => {
    e.preventDefault();
    const { gearstock } = this.props;
    const singleId = gearstock.id;
    this.props.history.push(`/gear/${singleId}`);
  }

  render() {
    const { gearstock } = this.props;
    return (
      <div>
        <img to='gear/:id' className="gear-item-image" src={gearstock.img} alt="gear card" onClick={this.singleViewEvent} />
        <h2>{gearstock.name}</h2>
        <h2>{formatPrice(gearstock.price)}</h2>
        <h6>{gearstock.condition}</h6>
        <span><button className="btn btn-danger" onClick={this.deleteEvent}>DELETE</button></span>
        <span><Button to='edit/:id' className="btn btn-primary" onClick={this.editEvent}>EDIT</Button></span>
      </div>
    );
  }
}

export default withRouter(GearItem);
