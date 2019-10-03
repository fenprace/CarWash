import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { UPDATE_TOKEN } from './actionTypes';

const initalState = {
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
  case UPDATE_TOKEN:
    return { ...state, token: action.payload.token };
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