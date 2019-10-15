import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import useRequest from '../../hooks/useRequest';
import { read } from '../../services/UserService';
import ContactList from '../../components/ContactList';
import TimeSlotPicker from './TimeSlotPicker';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const BookStep2 = props => {
  const { id } = props;

  const classes = useStyles();
  const { request: readUser, sourceData } = useRequest(read);
  const [selectedContact, setSelectedContact] = useState(-1);

  const handleUpdate = () => readUser({ id });
  const handleChangeContact = value => setSelectedContact(value);

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

    <TimeSlotPicker />
  </>;
};

BookStep2.propTypes = {
  id: PropTypes.number,
};

export default BookStep2;