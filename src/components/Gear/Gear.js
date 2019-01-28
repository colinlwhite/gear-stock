import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';

import authRequests from '../../helpers/data/authRequests';
import gearRequest from '../../helpers/data/gearRequest';
import GearItem from '../GearItem/GearItem';
// import GearForm from '../GearForm/GearForm';

class Gear extends React.Component {
  state = {
    gear: [],
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    gearRequest.getRequest(uid).then((gear) => {
      this.setState({ gear });
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
          });
      })
      .catch(err => console.error('error in deleting', err));
  }

  // formSubmitGear = (newGear) => {
  //   const { isEditing, editId } = this.state;
  //   if (isEditing) {
  //     gearRequest.putGear(editId, newGear)
  //       .then(() => {
  //         const uid = authRequests.getCurrentUid();
  //         gearRequest.getRequest(uid)
  //           .then((gear) => {
  //             this.setState({ gear, isEditing: false, editId: '-1' });
  //           });
  //       })
  //       .catch(err => console.error('error with gear post', err));
  //   } else {
  //     gearRequest.postGear(newGear)
  //       .then(() => {
  //         const uid = authRequests.getCurrentUid();
  //         gearRequest.getRequest(uid)
  //           .then((gear) => {
  //             this.setState({ gear });
  //           });
  //       })
  //       .catch(err => console.error('error in creating new gear', err));
  //   }
  // }

 passGearToEdit = gearId => this.setState({ isEditing: true, editId: gearId });

 render() {
   const { gear } = this.state;
   const gearItemComponents = gear.map(gearstock => (
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
        <h1>Your Gear</h1>
        <ul>{gearItemComponents}</ul>
      </div>
   );
 }
}

export default Gear;
