import React, { Component } from 'react';
import { Button } from 'reactstrap';
import gearRequest from '../helpers/data/gearRequest';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    gearRequest.getRequest()
      .then((gear) => {
        console.log(gear);
      })
      .catch(err => console.error('error with listing GET', err));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button className='btn btn-danger'>HELP ME</button>
          <Button
              tag="a"
              color="success"
              size="large"
              href="http://reactstrap.github.io"
              target="_blank"
          >
              View Reactstrap Docs
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
