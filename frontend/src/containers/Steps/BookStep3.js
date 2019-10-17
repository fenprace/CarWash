import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { withSnackbar } from 'notistack';

import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

import StepButtonSet from './StepButtonSet';
import { appointmentTypeToString } from '../../utils';
import useRequest from '../../hooks/useRequest';
import { bookAppointment } from '../../services/UserService';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const BookStep3 = props => {
  const { id, appointment, onBack, onConfirm, enqueueSnackbar } = props;
  const classes = useStyles();

  const { request } = useRequest(bookAppointment);

  const handleBack = () => onBack();
  const handleConfirm = () => {
    request({ id, ...appointment })
      .then(() => onConfirm())
      .catch(error => {
        enqueueSnackbar(error.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      });
  };

  return <>
    <Typography variant='h4' color='textSecondary' className={classes.mainPaper}>
      Confirm
    </Typography>

    <Paper className={classes.mainPaper}>
      <List>
        <ListItem>
          <ListItemIcon><LocalCarWashIcon /></ListItemIcon>
          <ListItemText primary={appointmentTypeToString(appointment.appointmentType)} />
        </ListItem>

        <ListItem>
          <ListItemIcon><ScheduleOutlinedIcon /></ListItemIcon>
          <ListItemText primary={`We are going to wash your vehicle at ${moment(appointment.time).format('hh:MM, MMMM Do, YYYY')}`} />
        </ListItem>
      </List>
    </Paper>

    <StepButtonSet onBack={handleBack} onConfirm={handleConfirm} />
  </>;
};

BookStep3.propTypes = {
  id: PropTypes.number,
  appointment: PropTypes.object,
  onBack: PropTypes.func,
  onConfirm: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(BookStep3);