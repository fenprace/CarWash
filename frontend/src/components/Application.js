import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import history from '../utils/history';
import Header from './Header';
import Home from '../containers/Home';
import LogIn from '../containers/LogIn';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(4),
  }
}));

const Application = () => {
  const classes = useStyles();

  return <Router history={history}>
    <CssBaseline />

    <Header />

    <main className={classes.main}>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={LogIn} />
      </Switch>
    </main>
  </Router>;
};

export default Application;
