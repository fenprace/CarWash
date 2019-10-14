import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import MuiLink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import ForwardIcon from '@material-ui/icons/Forward';
import { withSnackbar } from 'notistack';

import { logIn } from '../services/UserService';
import { updateToken } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
  },

  box: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}));

const LogIn = (props) => {
  const { dispatch, enqueueSnackbar } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
  });

  const handleLogIn = ({ email, password }) => {
    logIn({ email, password })
      .then(data => {
        const { token } = data;
        dispatch(updateToken(token));

        enqueueSnackbar('Log In Successfully.', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      })
      .catch(error => {
        enqueueSnackbar(error.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      });
  };

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <TextField
          fullWidth
          autoComplete='email'
          id='email'
          label='Email'
          name='email'
          margin='normal'
          variant='outlined'
          inputRef={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
          error={!!errors.email}
          helperText={errors.email && 'Please input a valid email.'}
        />

        <TextField
          fullWidth
          autoComplete='current-password'
          id='password'
          label='Password'
          margin='normal'
          name='password'
          type='password'
          variant='outlined'
          className={classes.textField}
          inputRef={register({ required: true })}
          error={!!errors.password}
          helperText={errors.password && 'Please input your password.'}
        />

        <div className={classes.box}>
          <MuiLink component='span'>
            <Link to='/register'>
              Do not have an account? Register
            </Link>
          </MuiLink>

          <Fab color='primary' type='submit'>
            <ForwardIcon />
          </Fab>
        </div>
      </form>
    </Container>
  );
};

LogIn.propTypes = {
  dispatch: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(connect()(LogIn));
