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
import VehicleList from '../../components/VehicleList';
import ServiceList from '../../components/ServiceList';
import StepButtonSet from './StepButtonSet';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const BookStep1 = props => {
  const { id, onNext, enqueueSnackbar } = props;

  const classes = useStyles();
  const { request: readUser, sourceData } = useRequest(read);
  const [selectedService, setSelectedService] = useState(-1);
  const [selectedVehicle, setSelectedVehicle] = useState(-1);

  const handleUpdate = () => readUser({ id });
  const handleChangeService = value => setSelectedService(value);
  const handleChangeVehicle = value => setSelectedVehicle(value);

  const handleNext = () => {
    if (selectedService === -1 || selectedVehicle === -1) {
      enqueueSnackbar('Please select a service and a vehicle.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } else onNext({
      appointmentType: selectedService,
      vehicleIds: [selectedVehicle],
    });
  };

  useEffect(() => {
    readUser({ id });
  }, []);

  return <>
    <Typography variant='h4' color='textSecondary' className={classes.mainPaper}>
      Select a Service
    </Typography>

    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Select a Service</ListSubheader>
        <ServiceList
          selected={selectedService}
          onSelect={handleChangeService}
        />
      </List>
    </Paper>

    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Select your Vehicle</ListSubheader>
        <VehicleList
          selectable
          selected={selectedVehicle}
          onSelect={handleChangeVehicle}
          onUpdate={handleUpdate}
          items={sourceData.vehicles}
          id={id}
        />
      </List>
    </Paper>

    <StepButtonSet onNext={handleNext} />
  </>;
};

BookStep1.propTypes = {
  id: PropTypes.number,
  onNext: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(BookStep1);