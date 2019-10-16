import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import useRequest from '../hooks/useRequest';
import { readTimeSlots } from '../services/AppointmentService';

const isAvailable = (time, timeSlots) => {
  return timeSlots.every(slot => !time.isBetween(slot, slot.add(40, 'minutes')));
};

const getAvailableTimeSlots = timeSlots =>{
  const startTime = moment().startOf('day').add(9.5, 'hours');
  const endTime = moment().startOf('day').add(16.5, 'hours').add(20, 'minutes');

  const available = [];

  for (let m = moment(startTime); m.isBefore(endTime); m = m.add(10, 'minutes')) {
    if (isAvailable(m, timeSlots)) available.push(moment(m));
  }

  return available;
};

const TimePicker = props => {
  const { onChange } = props;
  const { sourceData, request } = useRequest(readTimeSlots);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const availableTimeSlots = useMemo(() => {
    const sourceTimeSlots = sourceData.timeSlots
      ? sourceData.timeSlots.map(t => moment(t))
      : [];

    return getAvailableTimeSlots(sourceTimeSlots);
  }, [sourceData]);

  const handleChange = e => {
    const index = e.target.value;
    setSelectedIndex(index);
    if (onChange) onChange(availableTimeSlots[index]);
  };

  useEffect(() => {
    request();
  }, []);

  return <>
    <FormControl variant='outlined'>
      <Select autoWidth value={selectedIndex} onChange={handleChange}>
        {
          availableTimeSlots.map((time, index) => {
            return <MenuItem value={index} key={index}>
              {time.format('HH:mm')}
            </MenuItem>;
          })
        }
      </Select>
    </FormControl>
  </>;
};

TimePicker.propTypes = {
  onChange: PropTypes.func,
};

export default TimePicker;