import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import gearRequest from '../../helpers/data/gearRequest';

const defaultGear = {
  name: '',
  img: '',
  price: 0,
  condition: '',
  brand: '',
  year: '',
  model: '',
  category: '',
  uid: '',
};

class GearForm extends React.Component {
  state = {
    newGear: defaultGear,
    gear: [],
  }

  // Test

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    gearRequest.getRequest(uid).then((gear) => {
      this.setState({ gear });
    })
      .catch(err => console.error('error with getting the gear', err));
  }

  // #endregion

  formSubmitGear = (newGear) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      gearRequest.putGear(editId, newGear)
        .then(() => {
          const uid = authRequests.getCurrentUid();
          gearRequest.getRequest(uid)
            .then((gear) => {
              this.setState({ gear, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with gear post', err));
    } else {
      gearRequest.postGear(newGear)
        .then(() => {
          const uid = authRequests.getCurrentUid();
          gearRequest.getRequest(uid)
            .then((gear) => {
              this.setState({ gear });
            });
        })
        .catch(err => console.error('error in creating new gear', err));
    }
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempGear = { ...this.state.newGear };
    tempGear[name] = e.target.value;
    this.setState({ newGear: tempGear });
  }

  nameChange = e => this.formFieldStringState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    // const { onSubmit } = this.props;
    const myGear = { ...this.state.newGear };
    myGear.uid = authRequests.getCurrentUid();
    this.formSubmitGear(myGear);
    this.setState({ newGear: defaultGear });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      gearRequest.getSingleGear(editId)
        .then((gear) => {
          this.setState({ newGear: gear.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    const { newGear } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h1>Edit Gear</h1>;
      }
      return <h1>Add New Gear</h1>;
    };

    return (
      <div className="listing-form col">
      {title()}
      <form onSubmit={this.formSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="addressHelp"
            placeholder="Gear Item"
            value={newGear.name}
            onChange={this.nameChange}
          />
        </div>
        <button className="btn btn-danger">Save Gear</button>
      </form>
    </div>
    );
  }
}


export default GearForm;
