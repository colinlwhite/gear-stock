import React from 'react';
import { Button } from 'reactstrap';

class GearItem extends React.Component {
  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleGear, gearstock } = this.props;
    deleteSingleGear(gearstock.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passGearToEdit, gearstock } = this.props;
    passGearToEdit(gearstock.id);
  }

  render() {
    const { gearstock } = this.props;
    return (
      <div>
        <h2>{gearstock.name}</h2>
        <span><button className="btn btn-danger" onClick={this.deleteEvent}>DELETE</button></span>
        <span><Button className="btn btn-primary" onClick={this.editEvent}>EDIT</Button></span>
      </div>
    );
  }
}

export default GearItem;
