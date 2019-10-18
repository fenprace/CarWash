import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import momentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

import TimePicker from './TimePicker';

const TimeSlotPicker = props => {
  const { onChange } = props;

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

  return <MuiPickersUtilsProvider utils={momentUtils}>
    <List>
      <ListItem>
        <ListItemIcon><TodayOutlinedIcon /></ListItemIcon>
        <ListItemText primary='Change the Date to' />
        <DatePicker disablePast inputVariant='outlined' onChange={handleChangeDate} value={pickedDate} />
      </ListItem>
      <ListItem>
        <ListItemIcon><ScheduleOutlinedIcon /></ListItemIcon>
        <ListItemText primary='Change the Time to' />
        <TimePicker onChange={handleChangeTime} date={pickedDate} />
      </ListItem>
    </List>
  </MuiPickersUtilsProvider>;
};

TimeSlotPicker.propTypes = {
  onChange: PropTypes.func,
};

export default TimeSlotPicker;