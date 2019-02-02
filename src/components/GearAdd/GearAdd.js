import React from 'react';
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
  }

  formSubmitGear = (newGear) => {
    gearRequest.postGear(newGear)
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
    this.formSubmitGear(myGear);
  }

  render() {
    const { newGear } = this.state;
    return (
      <div className="listing-form col">
      <h1>Add New Gear</h1>
      <form onSubmit={this.formSubmit}>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="gearName"
            placeholder="Gear Name"
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

        <button className="btn btn-danger">Add Gear</button>
      </form>
    </div>
    );
  }
}


export default GearForm;
