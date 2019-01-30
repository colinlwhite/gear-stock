import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import authRequests from '../helpers/data/authRequests';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Gear from '../components/Gear/Gear';
import GearForm from '../components/GearForm/GearForm';
import GearEdit from '../components/GearEdit/GearEdit';
// import gearRequest from '../helpers/data/gearRequest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
 state = {
   authed: false,
   // gear: [],
   // isEditing: false,
   // editId: '-1',
 }

 componentDidMount() {
   connection();

   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({
         authed: true,
       });
       //  const uid = authRequests.getCurrentUid();
       //  gearRequest.getRequest(uid).then((gear) => {
       //    this.setState({ gear });
       //  })
       //    .catch(err => console.error('error with getting the gear', err));
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

 //  isAuthenticated = () => {
 //    this.setState({ authed: true });
 //  }

 //  deleteOneGear = (gearId) => {
 //    gearRequest.deleteGear(gearId)
 //      .then(() => {
 //        const uid = authRequests.getCurrentUid();
 //        gearRequest.getRequest(uid)
 //          .then((gear) => {
 //            this.setState({ gear });
 //          });
 //      })
 //      .catch(err => console.error('error in deleting', err));
 //  }

 //  formSubmitGear = (newGear) => {
 //    const { isEditing, editId } = this.state;
 //    if (isEditing) {
 //      gearRequest.putGear(editId, newGear)
 //        .then(() => {
 //          const uid = authRequests.getCurrentUid();
 //          gearRequest.getRequest(uid)
 //            .then((gear) => {
 //              this.setState({ gear, isEditing: false, editId: '-1' });
 //            });
 //        })
 //        .catch(err => console.error('error with gear post', err));
 //    } else {
 //      gearRequest.postGear(newGear)
 //        .then(() => {
 //          const uid = authRequests.getCurrentUid();
 //          gearRequest.getRequest(uid)
 //            .then((gear) => {
 //              this.setState({ gear });
 //            });
 //        })
 //        .catch(err => console.error('error in creating new gear', err));
 //    }
 //  }

 // passGearToEdit = gearId => this.setState({ isEditing: true, editId: gearId });

 render() {
   const {
     authed,
     // gear,
     // isEditing,
     // editId,
   } = this.state;

   const logoutClickEvent = () => {
     authRequests.logoutUser();
     this.setState({ authed: false });
   };

   return (
      <div className="App">
      <BrowserRouter>
      <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
              <div className='row'>
                <Switch>
                    <PrivateRoute path='/' exact component={Gear} authed={authed} />
                    <PrivateRoute path='/home' component={Gear} authed={authed} />
                    <PrivateRoute path='/add' authed={authed} component={GearForm} />
                    <PrivateRoute path='/edit/:id' authed={authed} component={GearEdit} />
                    <PublicRoute path='/auth' component={Auth} authed={authed} />
                </Switch>
              </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
   );
 }
}

export default App;
