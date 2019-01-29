import React from 'react';
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

class GearEdit extends React.Component {
  state = {
    editingGear: defaultGear,
  }

  formSubmitGearEdit = (editedGear) => {
    gearRequest.putGear(editId, newGear)
    .then(() => {
      this.setState({ })
      this.props.history.push('/home');
    })
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
    // TO REFRESH THE DOM - BUT NOT INSIDE A LIFECYCLE
    // const uid = authRequests.getCurrentUid();
    // gearRequest.getRequest(uid).then((pleasework) => {
    //   this.setState({ newGear: defaultGear, gear: pleasework });
    // });
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

  // passGearToEdit = gearId => this.setState({ isEditing: true, editId: gearId });

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
        <button className="btn btn-danger">Update Gear</button>
      </form>
    </div>
    );
  }
}

export default GearEdit;
