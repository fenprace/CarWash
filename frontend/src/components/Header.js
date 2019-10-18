import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeUserData } from '../redux/actions';
import history from '../utils/history';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const { dispatch, token, id, role } = props;
  const classes = useStyles();

  const handleLogOut = () => {
    dispatch(removeUserData());
    history.push('/');
  };

  const navigation = useMemo(() => {
    if (token) {
      if (role === 0) {
        return <>
          <Button color='inherit' to='/appointment' component={Link}>All Appointments</Button>
          <Button color='inherit' to={`/user/${id}`} component={Link}>Profile</Button>
          <Button color='inherit' onClick={handleLogOut}>Log Out</Button>
        </>;
      } else if (role === 1) {
        return <>
          <Button color='inherit' to='/book' component={Link}>Book</Button>
          <Button color='inherit' to={`/user/${id}/appointment`} component={Link}>My Appointments</Button>
          <Button color='inherit' to={`/user/${id}`} component={Link}>Profile</Button>
          <Button color='inherit' onClick={handleLogOut}>Log Out</Button>
        </>;
      }
    } else {
      return <>
        <Button color='inherit' to='/login' component={Link}>Log In</Button>
        <Button color='inherit' to='/register' component={Link}>Register</Button>
      </>;
    }
  }, [token, id, role]);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Gabriel & David
        </Typography>
        {navigation}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  id: PropTypes.number,
  role: PropTypes.number,
};

export default connect(({ token, id, role }) => ({ token, id, role }))(Header);
