import React from 'react';
import gearRequest from '../../helpers/data/gearRequest';
import authRequests from '../../helpers/data/authRequests';

class GearEdit extends React.Component {
  state = {
    newGear: [],
  }

  formSubmitGearEdit = (newGear) => {
    const editId = this.props.match.params.id;
    gearRequest.putGear(editId, newGear)
      .then(() => {
        this.props.history.push('/home');
      });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempGear = { ...this.state.newGear };
    tempGear[name] = e.target.value;
    this.setState({ newGear: tempGear });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    const tempGear = { ...this.state.newGear };
    tempGear[name] = e.target.value * 1;
    this.setState({ newGear: tempGear });
  }

  nameChange = e => this.formFieldStringState('name', e);

  imageChange = e => this.formFieldStringState('img', e);

  priceChange = e => this.formFieldNumberState('price', e);

  conditionChange = e => this.formFieldStringState('condition', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myGear = { ...this.state.newGear };
    myGear.uid = authRequests.getCurrentUid();
    this.formSubmitGearEdit(myGear);
  }

  componentDidMount() {
    const editId = this.props.match.params.id;
    gearRequest.getSingleGear(editId)
      .then((gear) => {
        this.setState({ newGear: gear.data });
      })
      .catch(err => console.error('error with getSingleListing', err));
  }

  render() {
    const { newGear } = this.state;
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

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            aria-describedby="gearImage"
            placeholder="image URL"
            value={newGear.img}
            onChange={this.imageChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            aria-describedby="gearPrice"
            placeholder=""
            value={newGear.price}
            onChange={this.priceChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition:</label>
          <input
            type="text"
            className="form-control"
            id="condition"
            aria-describedby="gearCondition"
            placeholder="condition"
            value={newGear.condition}
            onChange={this.conditionChange}
          />
        </div>
        <button className="btn btn-danger">Update Gear</button>
      </form>
    </div>
    );
  }
}


export default GearEdit;
