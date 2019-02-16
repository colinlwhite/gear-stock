import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      // this.props.isAuthenticated();
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error with auth', err));
  }

  render() {
    return (
      <div className="Auth">
      <h1 className="auth-logo">GEAR STOCK</h1>
      <button className="btn btn-outline-dark" onClick={this.authenticateUser}>
        LOGIN
      </button>
      </div>
    );
  }
}

export default Auth;
