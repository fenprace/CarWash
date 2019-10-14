import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import useRequest from '../hooks/useRequest';
import { read } from '../services/UserService';
import VehicleList from '../components/VehicleList';
import ServiceList from '../components/ServiceList';

const useStyles = makeStyles(theme => ({
  subTitle: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  mainCard: {
    marginTop: theme.spacing(2),
  },
  buttonSet: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Book = props => {
  const { id } = props;
  const classes = useStyles();

  const { request: readUser, sourceData } = useRequest(read);

  const [selectedService, setSelectedService] = useState(-1);
  const [selectedVehicle, setSelectedVehicle] = useState(-1);

  const handleUpdate = () => readUser({ id });
  const handleChangeService = value => setSelectedService(value);
  const handleChangeVehicle = value => setSelectedVehicle(value);

  useEffect(() => {
    readUser({ id });
  }, []);

  return <Container maxWidth='md'>
    <Paper>
      <Stepper activeStep={0}>
        <Step key={0}>
          <StepLabel>Select a Service</StepLabel>
        </Step>

        <Step key={1}>
          <StepLabel>Book an Appointment</StepLabel>
        </Step>

        <Step key={2}>
          <StepLabel>Drive your cleaned car</StepLabel>
        </Step>
      </Stepper>
    </Paper>

    <Typography variant='h4' color='textSecondary' className={classes.subTitle}> Select a Service </Typography>

    <Paper className={classes.mainCard}>
      <List>
        <ListSubheader>Select a Service</ListSubheader>
        <ServiceList
          selected={selectedService}
          onSelect={handleChangeService}
        />
      </List>
    </Paper>

    <Paper className={classes.mainCard}>
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

    <div className={classes.buttonSet}>
      <Button variant='contained'>Next</Button>
    </div>
    
  </Container>;
};

Book.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.number,
};

export default connect(({ id }) => ({ id }))(Book);