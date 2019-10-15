import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import useRequest from '../../hooks/useRequest';
import { read } from '../../services/UserService';
import VehicleList from '../../components/VehicleList';
import ServiceList from '../../components/ServiceList';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const BookStep1 = props => {
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
  </>;
};

BookStep1.propTypes = {
  id: PropTypes.number,
};

export default BookStep1;