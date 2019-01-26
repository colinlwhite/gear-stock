import React from 'react';
import GearItem from '../GearItem/GearItem';

class Gear extends React.Component {
  render() {
    const { gear, deleteSingleGear, passGearToEdit } = this.props;
    const gearItemComponents = gear.map(gearstock => (
      <GearItem
      gearstock={gearstock}
      key={gearstock.id}
      deleteSingleGear={deleteSingleGear}
      passGearToEdit={passGearToEdit}
      />
    ));
    return (
      <div>
        <h1>Your Gear</h1>
        <ul>{gearItemComponents}</ul>
      </div>
    );
  }
}

export default Gear;
