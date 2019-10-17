import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

import { read } from '../services/AppointmentService';
import useRequest from '../hooks/useRequest';
import ContactList from '../components/ContactList';
import VehicleList from '../components/VehicleList';
import { APPOINTMENT_TYPE_LIST } from '../utils';

const SingleAppointment = (props) => {
  const { match } = props;
  const id = Number(match.params.id);

  const { sourceData, request } = useRequest(read);

  const readAppointment = id => {
    request({ id });
  };

  useEffect(() => {
    readAppointment(id);
  }, []);

  const m = moment;
  const { contact, vehicles, appointmentType, time } = sourceData;
  debugger;

  return <Container maxWidth='md'>
    <Paper>
      <List>
        <ListSubheader>Service</ListSubheader>
        {
          appointmentType && <ListItem>
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
          vehicles && <VehicleList
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
      </List>
    </Paper>
  </Container>;
};

SingleAppointment.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default SingleAppointment;