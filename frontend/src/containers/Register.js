import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

import history from '../utils/history';
import UserService from '../services/UserService';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
  },

  box: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  }
}));

const Register = (props) => {
  const { dispatch, enqueueSnackbar } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
  });

  const handleRegister = ({ email, password }) => {
    UserService.register({ email, password })
      .then(() => {
        history.push('/login');
        enqueueSnackbar('Register Successfully.', {
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
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextField
          fullWidth
          autoComplete='email'
          id='email'
          label='Email'
          name='email'
          margin='normal'
          variant='outlined'
          className={classes.textField}
          inputRef={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
          error={!!errors.email}
          helperText={errors.email && 'Please input a valid email.'}
        />

        <TextField
          fullWidth
          autoComplete='new-password'
          id='password'
          label='Password'
          margin='normal'
          name='password'
          type='password'
          variant='outlined'
          className={classes.textField}
          inputRef={register({ required: true, minLength: 8 })}
          error={!!errors.password}
          helperText={errors.password && 'Your password is too short.'}
        />

        <div className={classes.box}>
          <Button variant='contained' color='primary' type='submit'>Register</Button>
        </div>
      </form>
    </Container>
  );
};

Register.propTypes = {
  dispatch: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(connect()(Register));
