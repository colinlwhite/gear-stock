import React from 'react';
import { Input } from 'reactstrap';
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

  brandChange = e => this.formFieldStringState('brand', e);

  modelChange = e => this.formFieldStringState('model', e);

  categoryChange = e => this.formFieldStringState('category', e);

  yearChange = e => this.formFieldStringState('year', e);

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
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            aria-describedby="gearBrand"
            placeholder="Brand"
            value={newGear.brand}
            onChange={this.brandChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            className="form-control"
            id="model"
            aria-describedby="gearModel"
            placeholder="model"
            value={newGear.model}
            onChange={this.modelChange}
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
        <Input type="select" onChange={this.conditionChange} value={newGear.condition}>
                <option>Just Got It</option>
                <option>Just Like New</option>
                <option>Excellent</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
                <option>Doesn't Work</option>
              </Input>
              </div>

              <div className="form-group">
        <label htmlFor="category">Category:</label>
        <Input type="select" onChange={this.categoryChange} value={newGear.category}>
                <option>Acoustic Guitars</option>
                <option>Amps</option>
                <option>Band and Orchestra</option>
                <option>Bass Guitars</option>
                <option>DJ and Lighting</option>
                <option>Drums and Percussion</option>
                <option>Effects and Pedals</option>
                <option>Electric Guitars</option>
                <option>Home Audio</option>
                <option>Keyboards and Synths</option>
                <option>Pro Audio</option>
              </Input>
              </div>

              <div className="form-group">
        <label htmlFor="year">Year:</label>
        <Input type="select" onChange={this.yearChange} value={newGear.year}>
                <option>2010s</option>
                <option>mid-2000s</option>
                <option>1990s</option>
                <option>1980s</option>
                <option>1970s</option>
                <option>1960s</option>
                <option>1950s</option>
                <option>1940s</option>
                <option>1930s</option>
              </Input>
              </div>

        <button className="btn btn-danger">Update Gear</button>
      </form>
    </div>
    );
  }
}


export default GearEdit;
