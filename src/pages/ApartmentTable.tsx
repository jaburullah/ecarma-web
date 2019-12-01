import React from 'react';
import MaterialTable, { Column } from 'material-table';
import axios from 'axios';

interface Row {
  apartmentID: string;
  name: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface Props {}
const ApartmentTable: React.FC<Props> = () => {
  const [state, setState] = React.useState<TableState>({
    columns: [{ title: 'Name', field: 'name' }],
    data: []
  });
  const getApartments = () => {
    axios
      .get('/getAllApartment')
      .then(res => {
        setState(c => {
          let nC = { ...c };
          nC.data = res.data;
          return nC;
        });
      })
      .catch(err => {
        console.log(err);
        setState(c => {
          let nC = { ...c };
          nC.data = [];
          return nC;
        });
      });
  };
  React.useEffect(() => {
    getApartments();
  }, []);

  return (
    <MaterialTable
      title="Manage Apartments"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            axios.post('/addApartment', newData).then(d => {
              console.log('success', d.data);
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(d.data);
                return { ...prevState, data };
              });
            });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            axios.post('/updateApartment', newData).then(d => {
              const data = d;
              console.log('success', data);
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            });
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            axios.post('/deleteApartment', oldData).then(d => {
              const data = d;
              console.log('success', data);
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            });
          })
      }}
    />
  );
};

export default ApartmentTable;
