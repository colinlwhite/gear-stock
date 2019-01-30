import React from 'react';
import gearRequest from '../../helpers/data/gearRequest';
import authRequests from '../../helpers/data/authRequests';

class GearEdit extends React.Component {
  state = {
    newGear: '',
  }

  formSubmitGearEdit = (newGear) => {
    const editId = this.props.match.params.id;
    gearRequest.putGear(editId, newGear)
      .then(() => {
      // this.setState({ })
        this.props.history.push('/home');
      });
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
    this.formSubmitGearEdit(myGear);
    // TO REFRESH THE DOM - BUT NOT INSIDE A LIFECYCLE
    // const uid = authRequests.getCurrentUid();
    // gearRequest.getRequest(uid).then((pleasework) => {
    //   this.setState({ newGear: defaultGear, gear: pleasework });
    // });
  }

  componentDidMount() {
    // const { isEditing, editId } = this.props;
    // if (prevProps !== this.props && isEditing) {
    const editId = this.props.match.params.id;
    gearRequest.getSingleGear(editId)
      .then((gear) => {
        this.setState({ newGear: gear.data });
      })
      .catch(err => console.error('error with getSingleListing', err));
  }

  // passGearToEdit = gearId => this.setState({ isEditing: true, editId: gearId });

  render() {
    const { newGear } = this.state;
    // const { isEditing } = this.props;
    return (
      <div className="listing-form col">
      <h1>Edit Gear</h1>
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
