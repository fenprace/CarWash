import { useState } from 'react';

import { addVehicle, addContact } from '../services/UserService';

const useRequest = _request => {
  const [isPending, setIsPending] = useState(true);
  const [sourceData, setSourceData] = useState({});

  const request = (...parameters) => {
    setIsPending(true);
    return _request(...parameters)
      .then(data => {
        setSourceData(data);
        return data;
      })
      .catch(error => Promise.reject(error))
      .finally(() => setIsPending(false));
  };

  return { isPending, sourceData, request };
};

export const useAddVehicle = () => {
  const { isPending, sourceData, request } = useRequest(addVehicle);

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
