import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import authRequests from '../helpers/data/authRequests';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Gear from '../components/Gear/Gear';
import gearRequest from '../helpers/data/gearRequest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
 state = {
   authed: false,
   gear: [],
 }

 componentDidMount() {
   connection();

   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({
         authed: true,
       });
       const uid = authRequests.getCurrentUid();
       gearRequest.getRequest(uid).then((gear) => {
         this.setState({ gear });
       })
         .catch(err => console.error('error with getting the gear', err));
     } else {
       this.setState({
         authed: false,
       });
     }
   });
 }

 componentWillUnmount() {
   this.removeListener();
 }

 isAuthenticated = () => {
   this.setState({ authed: true });
 }

 render() {
   const logoutClickEvent = () => {
     authRequests.logoutUser();
     this.setState({ authed: false });
   };

   if (!this.state.authed) {
     return (
      <div className="App">
      <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
     <Auth isAuthenticated={this.isAuthenticated}/>
      </div>
     );
   }

   return (
      <div className="App">
       <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
       <Gear gear={this.state.gear}/>
      </div>
   );
 }
}

export default App;
