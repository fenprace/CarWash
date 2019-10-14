import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MailOutlineIcon from '@material-ui/icons/MailOutline';

import VehicleList from '../components/VehicleList';
import ContactList from '../components/ContactList';

import { read } from '../services/UserService';
import useRequest from '../hooks/useRequest';

const SingleUser = (props) => {
  const { match } = props;
  const id = Number(match.params.id);

  const { isPending, sourceData, request } = useRequest(read);

  const readUser = id => {
    request({ id });
  };

  const handleUpdate = () => {
    readUser(id);
  };

  useEffect(() => {
    readUser(id);
  }, []);

  return <Container maxWidth='md'>
    <Paper>
      <List>
        <ListItem>
          <ListItemIcon><MailOutlineIcon /></ListItemIcon>
          <ListItemText primary={sourceData.email} />
        </ListItem>

        <Divider />
        <ListSubheader>My Vehicles</ListSubheader>

        { isPending
          ? <CircularProgress />
          : <VehicleList
            items={sourceData.vehicles}
            onUpdate={handleUpdate}
            id={id}
          />
        }
        
        <Divider />
        <ListSubheader>My Contacts</ListSubheader>

        { isPending
          ? <CircularProgress />
          : <ContactList
            items={sourceData.contacts}
            onUpdate={handleUpdate}
            id={id}
          />
        }
      </List>
    </Paper>
  </Container>;
};

SingleUser.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default SingleUser;