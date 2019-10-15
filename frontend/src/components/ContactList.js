import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Radio from '@material-ui/core/Radio';

import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

import ContactDialog from './ContactDialog';

const renderContactListItemText = (contact) => <>
  <ListItemText
    primary={`${contact.name} · ${contact.telephoneNumber}`}
    secondary={<>
      {contact.street}
      <Typography color='textSecondary' component='span' display='block' >
        {contact.suburb} {contact.state} {contact.postalCode}
      </Typography>
    </>}
  />
</>;

const ContactList = (props) => {
  const { items, id, onUpdate, selectable, onSelect, selected } = props;

  const [showingDialog, setShowingDialog] = useState(false);

  const handleAddContact = () => setShowingDialog(true);
  const handleCloseContact = () => setShowingDialog(false);
  const handleSelect = value => onSelect && onSelect(value);

  const addContactListItem = <>
    <ListItem
      button
      onClick={handleAddContact}
    >
      <ListItemIcon><AddOutlinedIcon /></ListItemIcon>
      <ListItemText primary='Add a Contact' />
    </ListItem>
    <ContactDialog
      isVisible={showingDialog}
      onClose={handleCloseContact}
      id={id}
      onUpdate={onUpdate}
    />
  </>;

  if (!items) return null;
  if (items.length === 0) return <>
    <ListItem>
      <ListItemIcon><NotInterestedOutlinedIcon /></ListItemIcon>
      <ListItemText primary='You have not registered your contacts here' />
    </ListItem>
    {addContactListItem}
  </>;

  return <>
    {
      items.map(i => {
        return <ListItem
          alignItems='flex-start'
          key={i.id}
          button={selectable}
          onClick={() => handleSelect(i.id)}
        >
          <ListItemIcon><ContactsOutlinedIcon /></ListItemIcon>
          {renderContactListItemText(i)}

          {
            selectable && <ListItemSecondaryAction>
              <Radio
                value={i.id}
                checked={selected === i.id}
                onChange={() => handleSelect(i.id)}
              />
            </ListItemSecondaryAction>
          }
        </ListItem>;
      })
    }
    {addContactListItem}
  </>;
};

ContactList.propTypes = {
  items: PropTypes.array,
  id: PropTypes.number,
  onUpdate: PropTypes.func,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.number,
};


export default ContactList;
