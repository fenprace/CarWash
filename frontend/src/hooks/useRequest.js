import { useState } from 'react';

const useRequest = (_request, _initialData) => {
  const initialData = _initialData === undefined
    ? {}
    : _initialData;

  const [isPending, setIsPending] = useState(true);
  const [sourceData, setSourceData] = useState(initialData);

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

export default useRequest;