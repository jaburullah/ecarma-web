import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';
import axios from 'axios';
import { AppContext } from '../store/context';
interface Props extends RouterProps {}

const Home: React.FC<Props> = ({ history }) => {
  const logout = () => {
    history.push('/');
  };

  const { dispatch } = React.useContext(AppContext);
  const getApartments = () => {
    axios
      .get('/getAllApartment')
      .then(res => {
        dispatch({ type: 'SET_APARTMENT', payload: { apartments: res.data } });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'SET_APARTMENT', payload: { apartments: [] } });
      });
  };

  const getAllUsers = () => {
    axios
      .get('/getAllUser')
      .then(res => {
        dispatch({ type: 'SET_USER', payload: { users: res.data } });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'SET_USER', payload: { users: [] } });
      });
  };

  React.useEffect(() => {
    getApartments();
    getAllUsers();
  }, []);

  return (
    <div>
      <NavBar logout={logout} />
    </div>
  );
};

export default Home;
