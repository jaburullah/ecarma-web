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
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../store/context';
import { AppState } from '../types';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
interface Props extends RouterProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 2,
    textAlign: 'center',
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 20,
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserForm: React.FC<Props> = ({ history }) => {
  const { AppState, dispatch } = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  let { id } = useParams();

  const [isEditMode, setIsEditMode] = React.useState(id ? true : false);
  const [isLoading, setLoading] = React.useState(true);

  const dialogMsgAddEdit = `User ${
    (!isEditMode && 'Added') || 'Edited'
  } Successfully`;
  const dialogMsgDelete = `Are you sure you want to delete this User ?`;

  const [dialogMsg, setDialogMsg] = React.useState(dialogMsgAddEdit);
  const [isDeleteMode, setDeleteMode] = React.useState(false);

  const handleClickOpen = () => {
    if (isDeleteMode) {
      axios
        .post('/deleteUser', { userID: editUser.userID })
        .then((data) => {
          console.log('success', data);
          setDialogMsg('User deleted successfully');
          setDeleteMode(false);
          dispatch({
            type: 'DELETE_USER',
            payload: { oldUser: editUser },
          });
        })
        .catch((e) => console.log(e));
    }
    if (!isDeleteMode) {
      history.push('/user');
    }
    setOpen(true);
  };

  const handleClose = () => {
    if (!isDeleteMode) {
      history.push('/user');
    }
    setOpen(false);
  };
  const classes = useStyles();
  const maxChartPassword = 4;
  const apartments = (AppState as AppState).apartments;
  const users = (AppState as AppState).users;
  const logout = () => {
    history.push('/');
  };

  const handleChangeApartment = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const apartmentIDs = event.target.value as string[];
    setSelectedApartments(apartmentIDs);
    if (role === 'secretary' && apartmentIDs.length) {
      setSelectedApartments(apartmentIDs.slice(-1));
    }
    let newState = { ...state };
    newState.errors.apartmentID = '';
    setState(newState);
  };
  const handleOnClickBack = () => {
    setDeleteMode(false);
    setIsEditMode(false);
    history.push('/user');
  };

  const handleChangeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
    let newState = { ...state };
    newState.errors.roles = '';
    setSelectedApartments([]);
    setState(newState);
  };
  const initialState = {
    userID: '',
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
      apartmentID: '',
    },
  };

  const [role, setRole] = React.useState('');
  const [selectedApartments, setSelectedApartments] = React.useState<string[]>(
    []
  );
  let editUser: any = null;
  if (isEditMode && apartments.length) {
    editUser = users.filter((o) => o.userID === id)[0];
    if (editUser) {
      initialState.name = editUser.name;
      initialState.password = editUser.password;
      initialState.confirmPassword = editUser.password;
      initialState.roles = editUser.roles;
      initialState.mobileNo = editUser.mobileNo;
      initialState.apartmentID =
        editUser.roles.indexOf('secretary') >= 0
          ? editUser.apartmentID.slice(-1)
          : editUser.apartmentID;
    } else {
      axios
        .post('/getUserById', { userID: id })
        .then((d) => {
          const data = d.data;
          const userData = data.data;
          if (!data.success) {
            console.log(userData.error);
          } else {
            initialState.name = userData.name;
            initialState.password = userData.password;
            initialState.confirmPassword = userData.password;
            initialState.roles = userData.roles;
            initialState.mobileNo = userData.mobileNo;
            initialState.apartmentID =
              userData.roles.indexOf('secretary') >= 0
                ? userData.apartmentID.slice(-1)
                : userData.apartmentID;
            setState(initialState);
            setRole(userData.roles[0]);
            setSelectedApartments(initialState.apartmentID);
          }
        })
        .catch((e) => console.log(e));
    }
  }

  const handleOnClickDelete = () => {
    setDialogMsg(dialogMsgDelete);
    setDeleteMode(true);
    setOpen(true);
  };

  const getApartments = () => {
    axios
      .get('/getAllApartment')
      .then((res) => {
        dispatch({ type: 'SET_APARTMENT', payload: { apartments: res.data } });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_APARTMENT', payload: { apartments: [] } });
      });
  };

  React.useEffect(() => {
    if (!apartments.length) {
      getApartments();
    } else {
      setLoading(false);
      if (editUser) {
        setState(initialState);
        setRole(editUser.roles[0]);
        const userApartmentID =
          editUser.roles.indexOf('secretary') >= 0
            ? editUser.apartmentID.slice(-1)
            : editUser.apartmentID;

        setSelectedApartments(userApartmentID);
      }
    }
  }, [AppState]);

  const [state, setState] = React.useState(initialState);
  type InputName = 'name' | 'password' | 'confirmPassword' | 'mobileNo';
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newState = { ...state };
    newState[e.target.name as InputName] = e.target.value;
    newState.errors[e.target.name as InputName] = '';
    setState(newState);
  };

  const addUser = (data: any) => {
    axios
      .post('/addUser', data)
      .then((res) => {
        const data = res.data;
        if (!data.success) {
          let newState = { ...state };
          newState.errors.mobileNo = 'Mobile No already exists.';
          setState(newState);
        } else {
          setState(initialState);
          setRole('');
          setSelectedApartments([]);
          dispatch({ type: 'ADD_USER', payload: { newUser: data.data } });
          handleClickOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = (data: any, oldUser: any) => {
    axios
      .post('/updateUser', data)
      .then((res) => {
        if (res.data && !res.data.success) {
          let newState = { ...state };
          newState.errors.mobileNo = 'Mobile No already exists.';
          setState(newState);
        } else {
          setState({
            userID: '',
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
              apartmentID: '',
            },
          });
          setRole('');
          setSelectedApartments([]);

          dispatch({
            type: 'UPDATE_USER',
            payload: { newUser: data, oldUser },
          });
          handleClickOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.name) {
      let newState = { ...state };
      newState.errors.name = 'Incorrect entry.';
      setState(newState);
      return;
    }
    if (
      !state.password ||
      state.password.length < maxChartPassword ||
      state.password.length > maxChartPassword
    ) {
      let newState = { ...state };
      newState.errors.password = 'Incorrect entry.';
      setState(newState);
      return;
    }
    if (
      !state.confirmPassword ||
      state.confirmPassword.length < maxChartPassword ||
      state.confirmPassword.length > maxChartPassword
    ) {
      let newState = { ...state };
      newState.errors.confirmPassword = 'Incorrect entry.';
      setState(newState);
      return;
    }
    if (state.password !== state.confirmPassword) {
      let newState = { ...state };
      newState.errors.password = 'Incorrect entry.';
      newState.errors.confirmPassword = 'Incorrect entry.';
      setState(newState);
      return;
    }

    if (!state.mobileNo || state.mobileNo.length !== 10) {
      let newState = { ...state };
      newState.errors.mobileNo = 'Incorrect entry.';
      setState(newState);
      return;
    }

    if (!role) {
      let newState = { ...state };
      newState.errors.roles = 'Incorrect selection.';
      setState(newState);
      return;
    }

    if (!selectedApartments.length) {
      let newState = { ...state };
      newState.errors.apartmentID = 'Incorrect selection.';
      setState(newState);
      return;
    }
    const data = { ...state };
    delete data.errors;
    delete data.confirmPassword;
    data.roles = [role];
    data.apartmentID = selectedApartments;

    const u = users.filter((o) => o.mobileNo === data.mobileNo)[0];
    if (u && u.userID !== id) {
      let newState = { ...state };
      newState.errors.mobileNo = 'Mobile No already exists.';
      setState(newState);
    } else {
      if (isEditMode && id) {
        data.userID = id;
        updateUser(data, u);
      } else {
        addUser(data);
      }
    }
  };

  const getApartmentNameById = (selected: string[]) => {
    return selected
      .map((o) => {
        const v = apartments.filter((d) => d.apartmentID === o);
        return (v.length && v[0].name) || '';
      })
      .join(', ');
  };
  return (
    <div className={classes.root}>
      <NavBar logout={logout} />
      {!isLoading ? (
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
                      id: 'role-native-required',
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
                    renderValue={(selected) =>
                      getApartmentNameById(selected as string[])
                    }
                    MenuProps={MenuProps}
                  >
                    {apartments.map((apartment) => (
                      <MenuItem
                        key={apartment.apartmentID}
                        value={apartment.apartmentID}
                      >
                        <Checkbox
                          checked={
                            selectedApartments.indexOf(apartment.apartmentID) >
                            -1
                          }
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
                  <Button
                    variant="contained"
                    className={classes.submit}
                    onClick={handleOnClickBack}
                  >
                    Back
                  </Button>
                  {isEditMode && (
                    <Button
                      onClick={handleOnClickDelete}
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submit}
                  >
                    {isEditMode ? 'Update' : 'Save'}
                  </Button>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <FormHelperText></FormHelperText>
                </Grid>
              </form>
            </Grid>

            <Grid item xs></Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Info'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogMsg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <Button onClick={handleClickOpen} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default UserForm;
