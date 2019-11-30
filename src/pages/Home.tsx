import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';

interface Props extends RouterProps {}

const Home: React.FC<Props> = ({ history }) => {
  const logout = () => {
    history.push('/');
  };
  return (
    <div>
      <NavBar logout={logout} />
    </div>
  );
};

export default Home;
