import { UPDATE_TOKEN, REMOVE_TOKEN, UPDATE_USER_DATA, REMOVE_USER_DATA } from './actionTypes';
import history from '../utils/history';

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

export const updateUserData = ({ token, id, role }) => {
  return dispatch => {
    const userData = { token, id, role };
    window.localStorage.setItem('userData', JSON.stringify(userData));
    dispatch({
      type: UPDATE_USER_DATA,
      payload: userData,
    });
  };
};

export const removeUserData = () => {
  history.push('/login');
  return dispatch => {
    window.localStorage.removeItem('userData');
    dispatch({ type: REMOVE_USER_DATA });
  };
};