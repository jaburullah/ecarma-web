interface User {
  userID: string;
  name: string;
  password: string;
  apartmentID: string[];
  roles: string[];
  mobileNo: string;
}
interface Apartment {
  apartmentID: string;
  name: string;
}

export interface AppState {
  users: User[];
  apartments: Apartment[];
}

export interface Action {
  type: string;
  payload: any;
}
