import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const CancelDialog = props => {
  const { isVisible, onClose, onConfirm } = props;

  return <Dialog
    open={isVisible}
    onClose={onClose}
    
  >
    <DialogContent>
      <DialogContentText>
        Do you confirm to cancel this appointment?
      </DialogContentText>
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose}>No</Button>
      <Button color='secondary' variant='contained' onClick={onConfirm}>Confirm</Button>
    </DialogActions>
  </Dialog>;
};

CancelDialog.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default CancelDialog;