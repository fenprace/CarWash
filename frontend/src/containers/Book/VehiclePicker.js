import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import VehicleList from '../../components/VehicleList';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const VehiclePicker = props => {
  const { user, appointment, onChange, onUpdate } = props;

  const classes = useStyles();

  const handleChangeVehicle = value => onChange({ vehicleIds: [value] });

  return <>
    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Select your Vehicle</ListSubheader>
        <VehicleList
          selectable
          selected={appointment.vehicleIds[0]}
          onSelect={handleChangeVehicle}
          onUpdate={onUpdate}
          items={user.vehicles}
          id={user.id}
        />
      </List>
    </Paper>
  </>;
};

VehiclePicker.propTypes = {
  user: PropTypes.object,
  appointment: PropTypes.object,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default VehiclePicker;