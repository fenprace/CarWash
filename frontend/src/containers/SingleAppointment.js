import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import { read, cancel, reschedule } from '../services/AppointmentService';
import useRequest from '../hooks/useRequest';
import history from '../utils/history';
import _SingleAppointment from '../components/SingleAppointment';
import CancelDialog from '../components/CancelDialog';
import RescheduleDialog from '../components/RescheduleDialog';

const useStyles = makeStyles(theme => ({
  buttonSet: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    float: 'right',
  },
  button: {
    marginLeft: theme.spacing(1),
  }
}));

const SingleAppointment = (props) => {
  const { match, enqueueSnackbar } = props;
  const id = Number(match.params.id);
  const classes = useStyles();

  const [showingCancel, setShowingCancel] = useState(false);
  const [showingReschedule, setShowingReschedule] = useState(false);

  const { sourceData, request: readAppointment } = useRequest(read);
  const { request: cancelAppointment } = useRequest(cancel);
  const { request: rescheduleAppointment } = useRequest(reschedule);

  const handleOpenCancel = () => setShowingCancel(true);
  const handleCloseCancel = () => setShowingCancel(false);
  const handleCancel = () => {
    cancelAppointment({ id })
      .then(() => {
        handleCloseCancel();
        enqueueSnackbar('Cancel the Appointment Successfully.', {
          variant: 'warning',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        history.goBack();
      })
      .catch(error => {
        handleCloseCancel();
        enqueueSnackbar(error.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      });
  };

  const handleOpenReschedule = () => setShowingReschedule(true);
  const handleCloseReschedule = () => setShowingReschedule(false);
  const handleReschedule = time => {
    rescheduleAppointment({ id, time })
      .then(() => {
        handleCloseReschedule();
        enqueueSnackbar('Reschedule the Appointment Successfully.', {
          variant: 'warning',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        readAppointment({ id });
      })
      .catch(error => {
        handleCloseReschedule();
        enqueueSnackbar(error.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      });
  };

  useEffect(() => {
    readAppointment({ id });
  }, []);

  return <Container maxWidth='md'>
    <Paper>
      <_SingleAppointment id={id} appointment={sourceData} displayView={false} />
    </Paper>

    <div className={classes.buttonSet}>
      <Button
        variant='outlined'
        color='secondary'
        className={classes.button}
        onClick={handleOpenCancel}
      >
        Cancel this Appointment
      </Button>

      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        onClick={handleOpenReschedule}
      >
        Reschedule this Appointment
      </Button>
    </div>

    <CancelDialog
      isVisible={showingCancel}
      onClose={handleCloseCancel}
      onConfirm={handleCancel}
    />

    <RescheduleDialog
      isVisible={showingReschedule}
      onClose={handleCloseReschedule}
      onConfirm={handleReschedule}
    />
  </Container>;
};

SingleAppointment.propTypes = {
  match: PropTypes.object,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(SingleAppointment);