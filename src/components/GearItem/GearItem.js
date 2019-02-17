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
      <div className="col-auto mb-3">
        <div className="card" style={{ width: '18rem' }}>
        <img to='gear/:id' className="gear-item-image" src={gearstock.img} alt="gear card" onClick={this.singleViewEvent} />
          <h2 className="card-text">{gearstock.name}</h2>
          <h2 className="card-text">{formatPrice(gearstock.price)}</h2>
          <h6>{gearstock.condition}</h6>
          <span>
          <button to='edit/:id' className="edit btn btn-outline-dark" onClick={this.editEvent}><i className="fas fa-pen fa-2x"></i></button>
          <button className="delete btn btn-outline-dark" onClick={this.deleteEvent}><i className="fas fa-trash-alt fa-2x"></i></button>
          </span>
      </div>
      </div>
    );
  }
}

export default withRouter(GearItem);
