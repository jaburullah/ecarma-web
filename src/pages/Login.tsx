import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RouterProps } from 'react-router';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

type login = {
  email: string;
  password: string;
  errors: { email: string; password: string };
};
type InputName = 'email' | 'password';

interface Props extends RouterProps {}

const Login: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  const initialState = {
    email: '',
    password: '',
    errors: { email: '', password: '' }
  };
  const [state, setState] = React.useState<login>(initialState);
  const updateState = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newState = { ...state };
      newState[e.target.name as InputName] = e.target.value;
      newState.errors[e.target.name as InputName] = '';
      setState(newState);
    },
    [state]
  );
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //history.push('/home');
    if (state.email === 'admin@gmail.com' && state.password === 'admin') {
      console.log('success');
      history.push('/home');
    } else {
      if (!state.email) {
        let newState = { ...state };
        newState.errors.email = 'Incorrect entry.';
        setState(newState);
      }

      if (!state.password) {
        let newState = { ...state };
        newState.errors.password = 'Incorrect entry.';
        setState(newState);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            helperText={state.errors.email}
            error={state.errors.email ? true : false}
            value={state.email}
            onChange={updateState}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={state.password}
            onChange={updateState}
            helperText={state.errors.password}
            error={state.errors.password ? true : false}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
};
export default Login;
