import { useState } from 'react';

import { addVehicle, addContact } from '../services/UserService';

export const useAddVehicle = () => {
  const [isPending, setIsPending] = useState(true);
  const [sourceData, setSourceData] = useState({});

  const request = ({ id, vehicleType, description }) => {
    setIsPending(true);
    return addVehicle({ id, vehicleType, description })
      .then(data => {
        setSourceData(data);
        return data;
      })
      .catch(error => Promise.reject(error))
      .finally(() => setIsPending(false));
  };

  return { isPending, sourceData, request };
};

export const useAddContact = () => {
  const [isPending, setIsPending] = useState(true);
  const [sourceData, setSourceData] = useState({});

  const request = parameters => {
    setIsPending(true);
    return addContact(parameters)
      .then(data => {
        setSourceData(data);
        return data;
      })
      .catch(error => Promise.reject(error))
      .finally(() => setIsPending(false));
  };

  return { isPending, sourceData, request };
};
