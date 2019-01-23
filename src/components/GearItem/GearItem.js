import React from 'react';

class GearItem extends React.Component {
  render() {
    const { gearstock } = this.props;
    return (
      <div>
        <h2>{gearstock.name}</h2>
      </div>
    );
  }
}

export default GearItem;
