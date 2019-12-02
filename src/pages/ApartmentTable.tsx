import React from 'react';
import MaterialTable, { Column } from 'material-table';
import axios from 'axios';
import { AppContext } from '../store/context';
import { AppState } from '../types';

interface Row {
  apartmentID: string;
  name: string;
}

interface TableState {
  count: number;
}

interface Props {}
const ApartmentTable: React.FC<Props> = () => {
  const { AppState, dispatch } = React.useContext(AppContext);
  let data = (AppState as AppState).apartments;
  const columns = [{ title: 'Name', field: 'name' }];

  const [state, setState] = React.useState<TableState>({
    count: 0
  });

  return (
    <MaterialTable
      title="Manage Apartments"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            axios
              .post('/addApartment', newData)
              .then(d => {
                console.log('success', d.data);
                resolve();

                dispatch({
                  type: 'ADD_APARTMENT',
                  payload: { newApartment: d.data }
                });
                setState({ count: state.count + 1 });
              })
              .catch(e => console.log(e));
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            axios
              .post('/updateApartment', newData)
              .then(data => {
                console.log('success', data);
                resolve();
                dispatch({
                  type: 'UPDATE_APARTMENT',
                  payload: { newApartment: newData, oldApartment: oldData }
                });
                setState({ count: state.count + 1 });
              })
              .catch(e => console.log(e));
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            axios
              .post('/deleteApartment', { apartmentID: oldData.apartmentID })
              .then(data => {
                console.log('success', data);
                resolve();
                dispatch({
                  type: 'DELETE_APARTMENT',
                  payload: { oldApartment: oldData }
                });
                setState({ count: state.count + 1 });
              })
              .catch(e => console.log(e));
          })
      }}
    />
  );
};

export default ApartmentTable;
