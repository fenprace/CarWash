import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { read } from '../services/AppointmentService';
import useRequest from '../hooks/useRequest';

import _SingleAppointment from '../components/SingleAppointment';

const useStyles = makeStyles(theme => ({
  buttonSet: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    float: 'right',
  },
}));

const SingleAppointment = (props) => {
  const { match } = props;
  const id = Number(match.params.id);
  const classes = useStyles();

  const { sourceData, request } = useRequest(read);

  const readAppointment = id => {
    request({ id });
  };

  useEffect(() => {
    readAppointment(id);
  }, []);

  return <Container maxWidth='md'>
    <Paper>
      <_SingleAppointment id={id} appointment={sourceData} displayView={false} />
    </Paper>

    <div className={classes.buttonSet}>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
      >
        Cancel this Appointment
      </Button> 
    </div>
  </Container>;
};

SingleAppointment.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default SingleAppointment;