import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import ServiceList from '../../components/ServiceList';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const ServicePicker = props => {
  const { onChange, appointment } = props;

  const classes = useStyles();

  const handleChangeService = value => onChange({ appointmentType: value });

  return <>
    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Select a Service</ListSubheader>
        <ServiceList
          selected={appointment.appointmentType}
          onSelect={handleChangeService}
        />
      </List>
    </Paper>
  </>;
};

ServicePicker.propTypes = {
  id: PropTypes.number,
  onChange: PropTypes.func,
  appointment: PropTypes.object,
  user: PropTypes.object,
};

export default ServicePicker;