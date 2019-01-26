import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import authRequests from '../helpers/data/authRequests';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Gear from '../components/Gear/Gear';
import GearForm from '../components/GearForm/GearForm';
import gearRequest from '../helpers/data/gearRequest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
 state = {
   authed: false,
   gear: [],
   isEditing: false,
   editId: '-1',
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

 deleteOneGear = (gearId) => {
   gearRequest.deleteGear(gearId)
     .then(() => {
       const uid = authRequests.getCurrentUid();
       gearRequest.getRequest(uid)
         .then((gear) => {
           this.setState({ gear });
         });
     })
     .catch(err => console.error('error in deleting', err));
 }

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

 passGearToEdit = gearId => this.setState({ isEditing: true, editId: gearId });

 render() {
   const {
     authed,
     gear,
     isEditing,
     editId,
   } = this.state;
   const logoutClickEvent = () => {
     authRequests.logoutUser();
     this.setState({ authed: false });
   };

   if (!authed) {
     return (
      <div className="App">
      <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
     <Auth isAuthenticated={this.isAuthenticated}/>
      </div>
     );
   }

   return (
      <div className="App">
       <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
       <Gear
       gear={gear}
       deleteSingleGear={this.deleteOneGear}
       passGearToEdit={this.passGearToEdit}
       />
       <GearForm onSubmit={this.formSubmitGear} isEditing={isEditing} editId={editId}/>
      </div>
   );
 }
}

export default App;
