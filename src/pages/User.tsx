import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';
import UserTable, { Data } from './UserTable';

interface Props extends RouterProps {}

const User: React.FC<Props> = ({ history }) => {
  const logout = () => {
    history.push('/');
  };
  const onClickEdit = (row: Data) => {
    console.log(row);
    history.push('/user-form');
  };
  return (
    <div>
      <NavBar logout={logout} />
      <UserTable onClickEdit={onClickEdit} />
    </div>
  );
};

export default User;
