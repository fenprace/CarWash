import { UPDATE_TOKEN, REMOVE_TOKEN } from './actionTypes';

export const updateToken = token => {
  return dispatch => {
    window.localStorage.setItem('token', token);
    dispatch({
      type: UPDATE_TOKEN,
      payload: { token },
    });
  };
};

export const removeToken = () => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch({type: REMOVE_TOKEN,});
  };
};
