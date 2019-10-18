import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import ContactList from '../../components/ContactList';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const ContactPicker = props => {
  const { user, appointment, onChange, onUpdate } = props;

  const classes = useStyles();

  const handleChangeContact = value => onChange({ contactId: value });

  return <>
    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Select a Contact</ListSubheader>
        <ContactList
          selectable
          selected={appointment.contactId}
          onSelect={handleChangeContact}
          onUpdate={onUpdate}
          items={user.contacts}
          id={user.id}
        />
      </List>
    </Paper>
  </>;
};

ContactPicker.propTypes = {
  user: PropTypes.object,
  appointment: PropTypes.object,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default ContactPicker;