import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import Apartment from './pages/Apartment';
import UserForm from './pages/UserForm';
import { AppReducer } from './store/reducer';
import { AppContext } from './store/context';
import Axios from 'axios';

Axios.defaults.baseURL =
  'https://us-central1-ecarma-72d10.cloudfunctions.net/api';
const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(AppReducer, {
    users: [],
    apartments: []
  });

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <AppContext.Provider value={{ AppState: state, dispatch }}>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/user" component={User} />
              <Route exact path="/apartment" component={Apartment} />
              <Route exact path="/user-form/:id" component={UserForm} />
              <Route exact path="/user-form" component={UserForm} />
            </AppContext.Provider>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
