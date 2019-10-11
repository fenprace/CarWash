import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withSnackbar } from 'notistack';

import { useAddContact } from '../hooks';
import useFields from '../hooks/useFields';

const required = value => value.length !== 0;

const ContactDialog = (props) => {
  const { isVisible, onClose, id, enqueueSnackbar, onUpdate } = props;

  const { request } = useAddContact();

  const { fields, errors, checkAll, validateAll, updateAndValidate } = useFields({
    name: null,
    street: null,
    suburb: null,
    state: null,
    postalCode: null,
    telephoneNumber: null,
    telephoneType: 0,
  }, {
    name: required,
    street: required,
    suburb: required,
    state: required,
    telephoneNumber: required,
    postalCode: value => value.length === 4 && !isNaN(value),
  });

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    validateAll();
    if (!checkAll()) return;

    request({ id, ...fields })
      .then(() => {
        enqueueSnackbar('Add Contact Successfully.', {
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
    fullScreen={isFullScreen}
  >
    <form onSubmit={handleSubmit}>
      <DialogTitle>Add a Contact</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1} >
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Full Name'
              margin='dense'
              variant='outlined'
              name='name'
              autocomplete='name'
              error={errors.name}
              onChange={e => updateAndValidate('name', e.target.value) }
              helperText={ errors.name && 'Pleas enter your name.' }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Street'
              margin='dense'
              variant='outlined'
              name='street'
              autocomplete='shipping street-address'
              error={errors.street}
              onChange={e => updateAndValidate('street', e.target.value) }
              helperText={ errors.street && 'Pleas enter the street address.' }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label='Suburb'
              margin='dense'
              variant='outlined'
              name='suburb'
              autocomplete='shipping locality'
              error={errors.suburb}
              onChange={e => updateAndValidate('suburb', e.target.value) }
              helperText={ errors.suburb && 'Pleas enter the suburb.' }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label='State'
              margin='dense'
              variant='outlined'
              name='state'
              autocomplete='shipping region'
              error={errors.state}
              onChange={e => updateAndValidate('state', e.target.value) }
              helperText={ errors.state && 'Pleas enter the state.' }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label='Postal Code'
              margin='dense'
              variant='outlined'
              name='postalCode'
              type='number'
              autocomplete='shipping postal-code'
              error={errors.postalCode}
              onChange={e => updateAndValidate('postalCode', e.target.value) }
              helperText={ errors.postalCode && 'Pleas enter your valid postalCode.' }
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              select
              fullWidth
              variant='outlined'
              margin='dense'
              label='Telephone Type'
              name='telephoneType'
              value={fields.telephoneType}
              onChange={e => updateAndValidate('telephoneType', e.target.value) }
            >
              <MenuItem value={0}>Not Set</MenuItem>
              <MenuItem value={1}>Home</MenuItem>
              <MenuItem value={2}>Office</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={7}>
            <TextField
              fullWidth
              label='Tel'
              margin='dense'
              variant='outlined'
              name='telephoneNumber'
              autocomplete='tel'
              error={errors.telephoneNumber}
              onChange={e => updateAndValidate('telephoneNumber', e.target.value) }
              helperText={ errors.telephoneNumber && 'Pleas enter your telephone number.' }
            />
          </Grid>
        </Grid>
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

ContactDialog.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.number,
  enqueueSnackbar: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default withSnackbar(ContactDialog);