import React from 'react';
import NavBar from '../component/NavBar';
import { RouterProps } from 'react-router';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Input,
  Checkbox,
  ListItemText,
  FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props extends RouterProps {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 2,
    textAlign: 'center'
  },
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 1, 2)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const UserForm: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const maxChartPassword = 4;
  const apartments = [
    { name: 'apartment 1', id: '18eYGhUuKx66AF04MViP' },
    { name: 'apartment 2', id: '18eYGhUuKx66AF04MViV' },
    { name: 'apartment 3', id: '18eYGhUuKx66AF04MViX' },
    { name: 'apartment 4', id: '18eYGhUuKx66AF04MViZ' },
    { name: 'apartment 5', id: '18eYGhUuKx66AF04MViT' },
    { name: 'apartment 6', id: '18eYGhUuKx66AF04MViE' },
    { name: 'apartment 7', id: '18eYGhUuKx66AF04MViG' },
    { name: 'apartment 8', id: '18eYGhUuKx66AF04MVi1' }
  ];
  const logout = () => {
    history.push('/');
  };
  const [role, setRole] = React.useState('');
  const [selectedApartments, setSelectedApartments] = React.useState<string[]>(
    []
  );

  const handleChangeApartment = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedApartments(event.target.value as string[]);
    let newState = { ...state };
    newState.errors.apartmentID = '';
    setState(newState);
  };

  const handleChangeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
    let newState = { ...state };
    newState.errors.roles = '';
    setState(newState);
  };

  const [state, setState] = React.useState({
    name: '',
    password: '',
    confirmPassword: '',
    roles: [''],
    mobileNo: '',
    apartmentID: [''],
    errors: {
      name: '',
      password: '',
      confirmPassword: '',
      roles: '',
      mobileNo: '',
      apartmentID: ''
    }
  });
  type InputName = 'name' | 'password' | 'confirmPassword' | 'mobileNo';
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newState = { ...state };
    newState[e.target.name as InputName] = e.target.value;
    newState.errors[e.target.name as InputName] = '';
    setState(newState);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (!state.name) {
    //   let newState = { ...state };
    //   newState.errors.name = 'Incorrect entry.';
    //   setState(newState);
    //   return;
    // }
    // if (
    //   !state.password ||
    //   state.password.length < maxChartPassword ||
    //   state.password.length > maxChartPassword
    // ) {
    //   let newState = { ...state };
    //   newState.errors.password = 'Incorrect entry.';
    //   setState(newState);
    //   return;
    // }
    // if (
    //   !state.confirmPassword ||
    //   state.confirmPassword.length < maxChartPassword ||
    //   state.confirmPassword.length > maxChartPassword
    // ) {
    //   let newState = { ...state };
    //   newState.errors.confirmPassword = 'Incorrect entry.';
    //   setState(newState);
    //   return;
    // }
    // if (state.password !== state.confirmPassword) {
    //   let newState = { ...state };
    //   newState.errors.password = 'Incorrect entry.';
    //   newState.errors.confirmPassword = 'Incorrect entry.';
    //   setState(newState);
    //   return;
    // }

    // if (!state.mobileNo || state.mobileNo.length !== 10) {
    //   let newState = { ...state };
    //   newState.errors.mobileNo = 'Incorrect entry.';
    //   setState(newState);
    //   return;
    // }

    // if (!role) {
    //   let newState = { ...state };
    //   newState.errors.roles = 'Incorrect selection.';
    //   setState(newState);
    //   return;
    // }

    // if (!selectedApartments.length) {
    //   let newState = { ...state };
    //   newState.errors.apartmentID = 'Incorrect selection.';
    //   setState(newState);
    //   return;
    // }
    const data = { ...state };
    delete data.errors;
    delete data.confirmPassword;
    data.roles = [role];
    data.apartmentID = selectedApartments;
    console.log('submitted', data);
  };

  const getApartmentNameById = (selected: string[]) => {
    return selected
      .map(o => {
        const v = apartments.filter(d => d.id === o);
        return v[0].name;
      })
      .join(', ');
  };
  return (
    <div className={classes.root}>
      <NavBar logout={logout} />
      <div>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <form onSubmit={onSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                helperText={state.errors.name}
                error={state.errors.name ? true : false}
                value={state.name}
                onChange={updateState}
                autoComplete="name"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                helperText={state.errors.password}
                error={state.errors.password ? true : false}
                value={state.password}
                onChange={updateState}
                autoComplete="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                helperText={state.errors.confirmPassword}
                error={state.errors.confirmPassword ? true : false}
                value={state.confirmPassword}
                onChange={updateState}
                autoComplete="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobileNo"
                label="Mobile No"
                name="mobileNo"
                helperText={state.errors.mobileNo}
                error={state.errors.mobileNo ? true : false}
                value={state.mobileNo}
                onChange={updateState}
                autoComplete="mobileNo"
              />

              <FormControl
                required
                className={classes.formControl}
                fullWidth
                error={state.errors.roles ? true : false}
              >
                <InputLabel htmlFor="age-native-required">Role</InputLabel>
                <Select
                  native
                  value={role}
                  onChange={handleChangeRole}
                  name="role"
                  inputProps={{
                    id: 'role-native-required'
                  }}
                >
                  <option value={''}></option>
                  <option value={'manager'}>Manager</option>
                  <option value={'secretary'}>Secretary</option>
                </Select>
                {state.errors.roles && (
                  <FormHelperText>{state.errors.roles}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                required
                className={classes.formControl}
                fullWidth
                error={state.errors.apartmentID ? true : false}
              >
                <InputLabel id="demo-mutiple-checkbox-label">
                  Select Apartment
                </InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={selectedApartments}
                  onChange={handleChangeApartment}
                  input={<Input />}
                  renderValue={selected =>
                    getApartmentNameById(selected as string[])
                  }
                  MenuProps={MenuProps}
                >
                  {apartments.map(apartment => (
                    <MenuItem key={apartment.id} value={apartment.id}>
                      <Checkbox
                        checked={selectedApartments.indexOf(apartment.id) > -1}
                      />
                      <ListItemText primary={apartment.name} />
                    </MenuItem>
                  ))}
                </Select>
                {state.errors.apartmentID && (
                  <FormHelperText>{state.errors.apartmentID}</FormHelperText>
                )}
              </FormControl>

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button variant="contained" className={classes.submit}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                >
                  Save
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserForm;
