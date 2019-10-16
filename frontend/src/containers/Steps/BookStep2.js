import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import useRequest from '../../hooks/useRequest';
import { read } from '../../services/UserService';
import ContactList from '../../components/ContactList';
import TimeSlotPicker from './TimeSlotPicker';
import StepButtonSet from './StepButtonSet';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const BookStep2 = props => {
  const { id, onBack, onNext, enqueueSnackbar } = props;

  const classes = useStyles();
  const { request: readUser, sourceData } = useRequest(read);
  const [selectedContact, setSelectedContact] = useState(-1);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleUpdate = () => readUser({ id });
  const handleChangeContact = value => setSelectedContact(value);
  const handleChangeTime = value => setSelectedTime(value);

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    if (selectedContact === -1 || selectedTime === null) {
      enqueueSnackbar('Please select a contact and a time slot.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } else onNext({
      contactId: selectedContact,
      time: selectedTime,
    });
  };

  useEffect(() => {
    readUser({ id });
  }, []);

  return <>
    <Typography variant='h4' color='textSecondary' className={classes.mainPaper}>
      Book an Appointment
    </Typography>

    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Select a Contact</ListSubheader>
        <ContactList
          selectable
          selected={selectedContact}
          onSelect={handleChangeContact}
          onUpdate={handleUpdate}
          items={sourceData.contacts}
          id={id}
        />
      </List>
    </Paper>

    <TimeSlotPicker onChange={handleChangeTime} />

    <StepButtonSet onBack={handleBack} onNext={handleNext} />
  </>;
};

BookStep2.propTypes = {
  id: PropTypes.number,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(BookStep2);