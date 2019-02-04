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
import GearAdd from '../components/GearAdd/GearAdd';
import GearEdit from '../components/GearEdit/GearEdit';
import SingleView from '../components/SingleView/SingleView';
import Overview from '../components/Overview/Overview';
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
 }

 componentDidMount() {
   connection();

   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({
         authed: true,
       });
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

 render() {
   const {
     authed,
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
                    <PrivateRoute path='/overview' component={Overview} authed={authed} />
                    <PrivateRoute path='/add' authed={authed} component={GearAdd} />
                    <PrivateRoute path='/edit/:id' authed={authed} component={GearEdit} />
                    <PrivateRoute path='/gear/:id' authed={authed} component={SingleView} />
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
