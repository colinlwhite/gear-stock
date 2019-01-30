import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

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

  render() {
    const { gearstock } = this.props;
    return (
      <div>
        <h2>{gearstock.name}</h2>
        <span><button className="btn btn-danger" onClick={this.deleteEvent}>DELETE</button></span>
        <span><Button to='edit/:id' className="btn btn-primary" onClick={this.editEvent}>EDIT</Button></span>
      </div>
    );
  }
}

export default withRouter(GearItem);
