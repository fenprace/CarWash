import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withSnackbar } from 'notistack';

import { useAddVehicle } from '../hooks';
import useFields from '../hooks/useFields';

const VehicleDialog = (props) => {
  const { isVisible, onClose, id, enqueueSnackbar, onUpdate } = props;

  const { request } = useAddVehicle();

  const { fields, errors, checkAll, updateField, validateAll, updateAndValidate } = useFields({
    vehicleType: 0,
    description: null,
  }, {
    vehicleType: value => [1, 2, 3].includes(value)
  });

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const { vehicleType, description } = fields;

    validateAll();
    if (!checkAll()) return;

    request({ id, vehicleType, description })
      .then(() => {
        enqueueSnackbar('Add Vehicle Successfully.', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        onUpdate();
        onClose();
      }).catch(error => {
        enqueueSnackbar(error.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      });
  };

  return <Dialog
    open={isVisible}
    onClose={onClose}
  >
    <form onSubmit={handleSubmit}>
      <DialogTitle>Add a Vehicle</DialogTitle>
      <DialogContent dividers>
        <TextField
          select
          fullWidth
          variant='outlined'
          label='Vehicle Type'
          name='vehicleType'
          error={errors.vehicleType}
          value={fields.vehicleType}
          onChange={e => updateAndValidate('vehicleType', e.target.value) }
          helperText={ errors.vehicleType && 'Pleas select a vehicle type.' }
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>Hatchback</MenuItem>
          <MenuItem value={2}>Sedan</MenuItem>
          <MenuItem value={3}>SUV</MenuItem>
        </TextField>

        <TextField
          fullWidth
          multiline
          rows={4}
          label='Description'
          margin='normal'
          variant='outlined'
          name='description'
          onChange={e => updateField('description', e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type='submit'
          color='primary'
        >Add</Button>
      </DialogActions>
    </form>
  </Dialog>;
};

VehicleDialog.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.number,
  enqueueSnackbar: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default withSnackbar(VehicleDialog);