import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

import momentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import TimePicker from '../../components/TimePicker';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const TimeSlotPicker = props => {
  const { onChange } = props;

  const classes = useStyles();
  const [timeString, setTimeString] = useState(null);
  const [pickedDate, setPickedDate] = useState(null);

  const handleChangeDate = date => {
    const currentMoment = moment(timeString);
    const minutes = currentMoment.minutes();
    const hours = currentMoment.hours();
    const changedMoment = date.startOf('day').hours(hours).minutes(minutes);
    setPickedDate(date.toJSON());
    const changedJSON = changedMoment.toJSON();
    setTimeString(changedJSON);
    onChange({ time: changedJSON });
  };

  const handleChangeTime = time => {
    const currentMoment = moment(timeString);
    const minutes = time.minutes();
    const hours = time.hours();
    const changedMoment = currentMoment.startOf('day').hours(hours).minutes(minutes);
    const changedJSON = changedMoment.toJSON();
    setTimeString(changedJSON);
    onChange({ time: changedJSON, timeSet: true });
  };

  return <Paper className={classes.mainPaper}>
    <MuiPickersUtilsProvider utils={momentUtils}>
      <List>
        <ListSubheader>Pick a Time Slot</ListSubheader>
        <ListItem>
          <ListItemIcon><TodayOutlinedIcon /></ListItemIcon>
          <ListItemText primary='We are going to wash your vehicle on' />
          <DatePicker disablePast inputVariant='outlined' onChange={handleChangeDate} value={pickedDate} />
        </ListItem>
        <ListItem>
          <ListItemIcon><ScheduleOutlinedIcon /></ListItemIcon>
          <ListItemText primary='We are going to wash your vehicle at' />
          <TimePicker onChange={handleChangeTime} date={pickedDate} />
        </ListItem>
      </List>
    </MuiPickersUtilsProvider>
  </Paper>;
};

TimeSlotPicker.propTypes = {
  onChange: PropTypes.func,
};

export default TimeSlotPicker;