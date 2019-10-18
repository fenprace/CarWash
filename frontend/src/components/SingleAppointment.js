import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import moment from 'moment';
import { Link } from 'react-router-dom';

import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

import ContactList from '../components/ContactList';
import VehicleList from '../components/VehicleList';
import { APPOINTMENT_TYPE_LIST } from '../utils';

const SingleAppointment = (props) => {
  const { id, appointment, displayView = true } = props;
  const { contact, vehicles, appointmentType, time, id: aid } = appointment;

  return <List>
    <ListSubheader>
      Service
      {
        displayView && <ListItemSecondaryAction>
          <Button
            component={Link}
            to={`/appointment/${aid}`}
          >View</Button>
        </ListItemSecondaryAction>
      }
    </ListSubheader>

    {
      appointmentType !== undefined && <ListItem>
        <ListItemIcon><LocalCarWashIcon /></ListItemIcon>
        <ListItemText
          primary={APPOINTMENT_TYPE_LIST[appointmentType].primary}
          secondary={APPOINTMENT_TYPE_LIST[appointmentType].secondary}
        />
      </ListItem>
    }
    <Divider />

    <ListSubheader>Vehicle</ListSubheader>
    {
      vehicles && vehicles.length !== 0 && <VehicleList
        id={id}
        items={vehicles}
        displayAdd={false}
      />
    }
    <Divider />

    <ListSubheader>Contact</ListSubheader>
    {
      contact && <ContactList
        id={id}
        items={[contact]}
        displayAdd={false}
      />
    }
    <Divider />

    <ListSubheader>Time</ListSubheader>
    {
      time && <ListItem>
        <ListItemIcon><ScheduleOutlinedIcon /></ListItemIcon>
        <ListItemText primary={`${moment(time).format('HH:MM, dddd, MMMM Do, YYYY')}`} />
      </ListItem>
    }
  </List>;
};

SingleAppointment.propTypes = {
  id: PropTypes.number,
  appointment: PropTypes.object,
  displayView: PropTypes.bool,
};

export default SingleAppointment;