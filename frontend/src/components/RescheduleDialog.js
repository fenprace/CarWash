import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';

import TimeSlotPicker from './TimeSlotPicker';

const RescheduleDialog = props => {
  const { isVisible, onClose, onConfirm, enqueueSnackbar } = props;

  const [time, setTime] = useState({});

  const handleChangeTime = change => {
    setTime(t => ({ ...t, ...change }));
  };

  const handleConfirm = () => {
    if (time.time && time.timeSet) {
      onConfirm(time.time);
    } else {
      enqueueSnackbar('Please fill all blanks.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  return <Dialog
    fullWidth
    open={isVisible}
    onClose={onClose}
  >
    <DialogTitle>Reschedule the Appointment</DialogTitle>
    <DialogContent dividers>
      <TimeSlotPicker onChange={handleChangeTime} />
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose}>No</Button>
      <Button color='secondary' variant='contained' onClick={handleConfirm}>Reschedule</Button>
    </DialogActions>
  </Dialog>;
};

RescheduleDialog.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(RescheduleDialog);