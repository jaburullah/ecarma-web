import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';
import UserTable, { Data } from './UserTable';
import { AppContext } from '../store/context';
import Axios from 'axios';
import { AppState } from '../types';

interface Props extends RouterProps {}

const User: React.FC<Props> = ({ history }) => {
  const logout = () => {
    history.push('/');
  };
  const onClickEdit = (row: Data) => {
    history.push(`/user-form/${row.apartmentID}`);
  };
  const onClickAdd = () => {
    history.push('/user-form');
  };

  const { AppState, dispatch } = React.useContext(AppContext);

  const getAllUsers = () => {
    Axios.get('/getAllUser')
      .then(res => {
        dispatch({ type: 'SET_USER', payload: { users: res.data } });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'SET_USER', payload: { users: [] } });
      });
  };

  const data = (AppState as AppState).users;

  React.useEffect(() => {
    if (!data.length) {
      getAllUsers();
    }
  }, [AppState]);

  return (
    <div>
      <NavBar logout={logout} />
      <UserTable onClickEdit={onClickEdit} onClickAdd={onClickAdd} />
    </div>
  );
};

export default User;
