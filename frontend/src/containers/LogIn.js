import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import ForwardIcon from '@material-ui/icons/Forward';

import { logIn } from '../services/UserService';
import { UPDATE_TOKEN } from '../redux/actionTypes';

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
  const { dispatch } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const handleLogIn = ({ email, password }) => {
    logIn({ email, password })
      .then(data => {
        const { token } = data;
        dispatch({ type: UPDATE_TOKEN, payload: { token } });
      })
      .catch(error => console.error(error));
  };

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <TextField
          autoFocus
          fullWidth
          required
          autoComplete='email'
          id='email'
          label='Email'
          name='email'
          margin='normal'
          variant='outlined'
          inputRef={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
          error={Boolean(errors.email)}
          helperText={errors.email && 'Please input a valid email.'}
        />

        <TextField
          fullWidth
          required
          autoComplete='current-password'
          id='password'
          label='Password'
          margin='normal'
          name='password'
          type='password'
          variant='outlined'
          className={classes.textField}
          inputRef={register}
        />

        <div className={classes.box}>
          <Link >
            Do not have an account? Register
          </Link>

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
};

export default connect()(LogIn);
