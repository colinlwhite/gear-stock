import React from 'react';
import SearchField from 'react-search-field';
import { NavLink as RRNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import gearRequest from '../../helpers/data/gearRequest';
import GearItem from '../GearItem/GearItem';

class Gear extends React.Component {
  state = {
    gear: [],
    filteredGear: [],
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    gearRequest.getRequest(uid).then((gear) => {
      this.setState({ gear });
      this.setState({ filteredGear: gear });
    })
      .catch(err => console.error('error with getting the gear', err));
  }

  deleteOneGear = (gearId) => {
    gearRequest.deleteGear(gearId)
      .then(() => {
        const uid = authRequests.getCurrentUid();
        gearRequest.getRequest(uid)
          .then((gear) => {
            this.setState({ gear });
            this.setState({ filteredGear: gear });
          });
      })
      .catch(err => console.error('error in deleting', err));
  }

  onChange = (value, e) => {
    const { gear } = this.state;
    const filteredGear = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredGear: gear });
    } else {
      gear.forEach((gears) => {
        if (gears.name.toLowerCase().includes(value.toLowerCase()) || gears.categoryDisplay.toLowerCase().includes(value.toLowerCase())) {
          filteredGear.push(gears);
        }
        this.setState({ filteredGear });
      });
    }
  }

  render() {
    const { filteredGear } = this.state;
    const gearItemComponents = filteredGear.map(gearstock => (
      <GearItem
      gearstock={gearstock}
      key={gearstock.id}
      deleteSingleGear={this.deleteOneGear}
      passGearToEdit={this.passGearToEdit}
      />
    ));
    return (
      <div>
        <NavLink tag={RRNavLink} to='/add'><button className="btn btn-success">ADD Gear</button></NavLink>
        <SearchField
            placeholder="Search your gear"
            onChange={ this.onChange }
            searchText=""
            classNames=""
          />
        <h1>Your Gear</h1>
        <ul>{gearItemComponents}</ul>
      </div>
    );
  }
}

export default Gear;
