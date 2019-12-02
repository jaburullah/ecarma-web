import { ADD } from './actions';
import { AppState, Action } from '../types';

export const AppReducer = (state: AppState, action: Action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD:
      return state;
    case 'SET_APARTMENT':
      newState.apartments = action.payload.apartments;
      return newState;
    case 'ADD_APARTMENT':
      newState.apartments.push(action.payload.newApartment);
      return newState;
    case 'UPDATE_APARTMENT':
      if (action.payload.oldApartment) {
        newState.apartments[
          newState.apartments.indexOf(action.payload.oldApartment)
        ] = action.payload.newApartment;
      }
      return newState;
    case 'DELETE_APARTMENT':
      newState.apartments.splice(
        newState.apartments.indexOf(action.payload.oldApartment),
        1
      );
      return newState;
    case 'SET_USER':
      newState.users = action.payload.users;
      return newState;
    case 'ADD_USER':
      newState.users.push(action.payload.newUser);
      return newState;
    default:
      return state;
  }
};
