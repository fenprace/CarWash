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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withSnackbar } from 'notistack';

import { useAddContact } from '../hooks';
import useFields from '../hooks/useFields';
import CSSGrid from './CSSGrid';

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
        <CSSGrid container>
          <CSSGrid item xs={12}>
            <TextField
              fullWidth
              label='Full Name'
              margin='dense'
              variant='outlined'
              name='name'
              autoComplete='name'
              error={errors.name}
              onChange={e => updateAndValidate('name', e.target.value) }
              helperText={ errors.name && 'Pleas enter your name.' }
            />
          </CSSGrid>

          <CSSGrid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Street'
              margin='dense'
              variant='outlined'
              name='street'
              autoComplete='shipping street-address'
              error={errors.street}
              onChange={e => updateAndValidate('street', e.target.value) }
              helperText={ errors.street && 'Pleas enter the street address.' }
            />
          </CSSGrid>

          <CSSGrid item xs={4}>
            <TextField
              label='Suburb'
              margin='dense'
              variant='outlined'
              name='suburb'
              autoComplete='shipping address-level3'
              error={errors.suburb}
              onChange={e => updateAndValidate('suburb', e.target.value) }
              helperText={ errors.suburb && 'Pleas enter the suburb.' }
            />
          </CSSGrid>

          <CSSGrid item xs={4}>
            <TextField
              label='State'
              margin='dense'
              variant='outlined'
              name='state'
              autoComplete='shipping address-level2'
              error={errors.state}
              onChange={e => updateAndValidate('state', e.target.value) }
              helperText={ errors.state && 'Pleas enter the state.' }
            />
          </CSSGrid>

          <CSSGrid item xs={4}>
            <TextField
              label='Postal Code'
              margin='dense'
              variant='outlined'
              name='postalCode'
              type='number'
              autoComplete='shipping postal-code'
              error={errors.postalCode}
              onChange={e => updateAndValidate('postalCode', e.target.value) }
              helperText={ errors.postalCode && 'Pleas enter your valid postalCode.' }
            />
          </CSSGrid>

          <CSSGrid item xs={5}>
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
          </CSSGrid>

          <CSSGrid item xs={7}>
            <TextField
              fullWidth
              label='Tel'
              margin='dense'
              variant='outlined'
              name='telephoneNumber'
              autoComplete='tel'
              error={errors.telephoneNumber}
              onChange={e => updateAndValidate('telephoneNumber', e.target.value) }
              helperText={ errors.telephoneNumber && 'Pleas enter your telephone number.' }
            />
          </CSSGrid>
        </CSSGrid>
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