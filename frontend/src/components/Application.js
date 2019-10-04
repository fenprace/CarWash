import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import store from '../redux/store';
import history from '../utils/history';
import Header from './Header';
import Home from '../containers/Home';
import LogIn from '../containers/LogIn';
import Register from '../containers/Register';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(4),
  }
}));

const Application = () => {
  const classes = useStyles();

  return <Provider store={store}>
    <SnackbarProvider>
      <Router history={history}>
        <CssBaseline />

        <Header />

        <main className={classes.main}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={LogIn} />
            <Route path='/register' component={Register} />
          </Switch>
        </main>
      </Router>
    </SnackbarProvider>
  </Provider>;
};

export default Application;
