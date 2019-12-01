import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';
import ApartmentTable from './ApartmentTable';

interface Props extends RouterProps {}
const Apartment: React.FC<Props> = ({ history }) => {
  const logout = () => {
    history.push('/');
  };

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
