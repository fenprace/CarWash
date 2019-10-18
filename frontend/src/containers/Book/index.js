import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';

import ServicePicker from './ServicePicker';
import VehiclePicker from './VehiclePicker';
import ContactPicker from './ContactPicker';
import TimeSlotPicker from './TimeSlotPicker';
import ButtonSet from './ButtonSet';
import { read, bookAppointment } from '../../services/UserService';
import useRequest from '../../hooks/useRequest';
import history from '../../utils/history';

const Book = props => {
  const { id, enqueueSnackbar } = props;

  const [appointment, setAppointment] = useState({
    appointmentType: -1,
    time: null,
    contactId: -1,
    vehicleIds: [],
    description: null,
    timeSet: false,
  });

  const { request: readUser, sourceData } = useRequest(read);
  const { request: book } = useRequest(bookAppointment);
  

  const handleChange = change => setAppointment(a => ({ ...a, ...change }));
  const handleUpdate = () => readUser({ id });

  const handleConfirm = () => {
    const { appointmentType, time, contactId, vehicleIds, description, timeSet } = appointment;
  
    if (
      appointmentType === -1
      || time === null
      || contactId === -1
      || vehicleIds.length === 0
      || timeSet === false
    ) {
      enqueueSnackbar('Please fill all blanks.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } else {
      book({ id, appointmentType, time, contactId, vehicleIds, description })
        .then(() => {
          enqueueSnackbar('Book Successfully.', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          });
          history.push(`/user/${id}/appointment`);
        })
        .catch(error => {
          enqueueSnackbar(error.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          });
        });
    }
  };

  useEffect(() => {
    readUser({ id });
  }, []);

  return <Container maxWidth='md'>
    <Typography variant='h4' color='textSecondary'>Book an Appointment</Typography>

    <ServicePicker user={sourceData} appointment={appointment} onChange={handleChange} />
    <VehiclePicker user={sourceData} appointment={appointment} onChange={handleChange} onUpdate={handleUpdate} />
    <ContactPicker user={sourceData} appointment={appointment} onChange={handleChange} onUpdate={handleUpdate} />
    <TimeSlotPicker appointment={appointment} onChange={handleChange} />

    <ButtonSet onConfirm={handleConfirm} />
  </Container>;
};

Book.propTypes = {
  dispatch: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
  id: PropTypes.number,
};

const mapStateToProps = ({ id }) => ({ id });

export default withSnackbar(connect(mapStateToProps)(Book));