import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import Apartment from './pages/Apartment';
import UserForm from './pages/UserForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/apartment" component={Apartment} />
            <Route exact path="/user-form" component={UserForm} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
