import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';
import ApartmentTable from './ApartmentTable';
import { AppContext } from '../store/context';
import Axios from 'axios';
import { AppState } from '../types';

interface Props extends RouterProps {}
const Apartment: React.FC<Props> = ({ history }) => {
  const logout = () => {
    history.push('/');
  };

  const { AppState, dispatch } = React.useContext(AppContext);
  const getApartments = () => {
    Axios.get('/getAllApartment')
      .then(res => {
        dispatch({ type: 'SET_APARTMENT', payload: { apartments: res.data } });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'SET_APARTMENT', payload: { apartments: [] } });
      });
  };

  const data = (AppState as AppState).apartments;

  React.useEffect(() => {
    if (!data.length) {
      getApartments();
    }
  }, [AppState]);

  return (
    <div>
      <NavBar logout={logout} />
      <div style={{ padding: '10px' }}>
        <ApartmentTable />
      </div>
    </div>
  );
};

export default Apartment;
