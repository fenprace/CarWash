import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import _SingleAppointment from './SingleAppointment';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const AppointmentList = props => {
  const { id, items } = props;
  const classes = useStyles();

  return <>
    {
      items.map(i => {
        return <Paper key={i.id} className={classes.mainPaper}>
          <_SingleAppointment id={id} appointment={i} />
        </Paper>;
      })
    }
  </>;
};

AppointmentList.propTypes = {
  id: PropTypes.number,
  items: PropTypes.array,
};


export default AppointmentList;