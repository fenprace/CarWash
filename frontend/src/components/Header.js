import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Gabriel & David
        </Typography>
        <Button color='inherit'>Log In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
