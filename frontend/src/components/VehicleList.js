import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import VehicleDialog from './VehicleDialog';
import { vehicleTypeToString } from '../utils';

const VehicleList = (props) => {
  const { items, id, onUpdate } = props;

  const [showingDialog, setShowingDialog] = useState(false);

  const handleAddVehicle = () => setShowingDialog(true);
  const handleCloseVehicle = () => setShowingDialog(false);

  const addVehicleListItem = <>
    <ListItem
      button
      onClick={handleAddVehicle}
    >
      <ListItemIcon><AddOutlinedIcon /></ListItemIcon>
      <ListItemText primary='Add a Vehicle' />
    </ListItem>
    <VehicleDialog
      isVisible={showingDialog}
      onClose={handleCloseVehicle}
      id={id}
      onUpdate={onUpdate}
    />
  </>;

  if (!items) return null;
  if (items.length === 0) return <>
    <ListItem>
      <ListItemIcon><NotInterestedOutlinedIcon /></ListItemIcon>
      <ListItemText primary='You have not registered your vehicles here' />
    </ListItem>
    {addVehicleListItem}
  </>;

  return <>
    {
      items.map(i => {
        return <ListItem key={i.id}>
          <ListItemIcon><DriveEtaIcon /></ListItemIcon>
          <ListItemText
            primary={vehicleTypeToString(i.vehicleType)}
            secondary={i.description}
          />
        </ListItem>;
      })
    }
    {addVehicleListItem}
  </>;
};

VehicleList.propTypes = {
  items: PropTypes.array,
  id: PropTypes.number,
  onUpdate: PropTypes.func,
};

export default VehicleList;

