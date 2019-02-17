import React from 'react';
import { Input } from 'reactstrap';
import gearRequest from '../../helpers/data/gearRequest';
import authRequests from '../../helpers/data/authRequests';
import './GearEdit.scss';

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

  categoryDisplayChange = (e) => {
    const tempGear = { ...this.state.newGear };
    tempGear.categoryDisplay = e.currentTarget.value;
    if (e.currentTarget.value === 'Drums & Percussion') {
      tempGear.categoryData = 'drum';
    } else if (e.currentTarget.value === 'DJ and Lighting') {
      tempGear.categoryData = 'dj';
    } else if (e.currentTarget.value === 'Electric Guitars') {
      tempGear.categoryData = 'eguitars';
    } else if (e.currentTarget.value === 'Amps') {
      tempGear.categoryData = 'amps';
    } else if (e.currentTarget.value === 'Acoustic Guitars') {
      tempGear.categoryData = 'aguitars';
    } else if (e.currentTarget.value === 'Bass Guitars') {
      tempGear.categoryData = 'bassguitar';
    } else if (e.currentTarget.value === 'Band and Orchestra') {
      tempGear.categoryData = 'band';
    } else if (e.currentTarget.value === 'Home Audio') {
      tempGear.categoryData = 'home';
    } else if (e.currentTarget.value === 'Effects and Pedals') {
      tempGear.categoryData = 'effectspedals';
    } else if (e.currentTarget.value === 'Keyboards and Synths') {
      tempGear.categoryData = 'keyboards';
    } else if (e.currentTarget.value === 'Pro Audio') {
      tempGear.categoryData = 'proaudio';
    }
    this.setState({ newGear: tempGear });
  }

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
      <form onSubmit={this.formSubmit} autocomplete="off">
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
        <label htmlFor="categoryDisplay">Category:</label>
        <Input type="select" onChange={this.categoryDisplayChange} value={newGear.categoryDisplay}>
                <option>Acoustic Guitars</option>
                <option>Amps</option>
                <option>Band and Orchestra</option>
                <option>Bass Guitars</option>
                <option>DJ and Lighting</option>
                <option>Drums & Percussion</option>
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

        <button className="btn btn-light">SAVE</button>
      </form>
    </div>
    );
  }
}


export default GearEdit;
