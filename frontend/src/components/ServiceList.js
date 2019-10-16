import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Radio from '@material-ui/core/Radio';

import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';

import { APPOINTMENT_TYPE_LIST } from '../utils';

const ServiceList = props => {
  const { onSelect, selected } = props;

  const handleSelect = type => {
    onSelect(type);
  };

  return <>
    {
      APPOINTMENT_TYPE_LIST.map(s => (
        <ListItem
          button
          key={s.appointmentType}
          onClick={() => handleSelect(s.appointmentType)}
        >
          <ListItemIcon><LocalCarWashIcon /></ListItemIcon>
          <ListItemText primary={s.primary} secondary={s.secondary} />
          <ListItemSecondaryAction>
            <Radio
              value={s.appointmentType}
              checked={selected === s.appointmentType}
              onChange={() => handleSelect(s.appointmentType)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))
    }
  </>;
};

ServiceList.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.number,
};

export default ServiceList;