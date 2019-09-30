import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles(theme => ({
  fab: {
    
  },

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

const LogIn = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='xs'>
      <form>
        <TextField
          margin='normal'
          variant='outlined'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          autoComplete='email'
          autoFocus
        />

        <TextField
          className={classes.textField}
          margin='normal'
          required
          variant='outlined'
          fullWidth
          id='password'
          type='password'
          label='Password'
          name='password'
          autoComplete='current-password'
        />
      </form>

      <div className={classes.box}>
        <Link >
          Do not have an account? Register
        </Link>

        <Fab color='primary' className={classes.fab}>
          <ForwardIcon />
        </Fab>
      </div>
      
 
    </Container>
  );
};

export default LogIn;
