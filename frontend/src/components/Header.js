import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeToken } from '../redux/actions';
import history from '../utils/history';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const { dispatch, token } = props;
  const classes = useStyles();

  const handleLogOut = () => {
    dispatch(removeToken());
    history.push('/');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Gabriel & David
        </Typography>

        {
          token
            ? <>
              <Button
                color='inherit'
                to='/user/1'
                component={Link}
              >
                Profile
              </Button>
              <Button
                color='inherit'
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </>
            : <>
              <Button
                color='inherit'
                to='/login'
                component={Link}
              >
                Log In 
              </Button>
              <Button
                color='inherit'
                to='/register'
                component={Link}
              >
                Register
              </Button>
            </>
        }
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
};

export default connect(({ token }) => ({ token }))(Header);
