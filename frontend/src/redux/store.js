import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { UPDATE_TOKEN, REMOVE_TOKEN, UPDATE_USER_DATA, REMOVE_USER_DATA } from './actionTypes';

const createInitialState = () => {
  const userDataString = window.localStorage.getItem('userData');

  try {
    const { token, id, role } = JSON.parse(userDataString);
    return { token, id, role };
  } catch(e) {
    return {
      token: null,
      id: null,
      role: null,
    };
  }
};

const initalState = createInitialState();

const reducer = (state, action) => {
  switch (action.type) {
  case UPDATE_TOKEN:
    return { ...state, token: action.payload.token };
  case REMOVE_TOKEN:
    return { ...state, token: null };
  case UPDATE_USER_DATA:
    return { ...state, ...action.payload };
  case REMOVE_USER_DATA:
    return {
      ...state,
      token: null,
      id: null,
      role: null,
    };
  default:
    return state;
  }
};

export default createStore(reducer,
  initalState,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);