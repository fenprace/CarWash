import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const { token } = props;
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Gabriel & David
        </Typography>

        {
          token
            ? null
            : <Button
            color='inherit'
            to='/login'
            component={Link}
          >
            Log In 
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  token: PropTypes.string,
}

export default connect(({ token }) => ({ token }))(Header);
