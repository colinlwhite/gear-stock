import React from 'react';

class GearItem extends React.Component {
  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleGear, gearstock } = this.props;
    deleteSingleGear(gearstock.id);
  }

  render() {
    const { gearstock } = this.props;
    return (
      <div>
        <h2>{gearstock.name}</h2>
        <span><button className="btn btn-danger" onClick={this.deleteEvent}>DELETE</button></span>
      </div>
    );
  }
}

export default GearItem;
