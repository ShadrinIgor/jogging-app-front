import {AUTH_LOGIN} from '../constants/Auth';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${AUTH_LOGIN}${_SUCCESS}` :
      return {...state, data: action.data, login: true};

    case `${AUTH_LOGIN}${_FAILURE}` :
      return {...state, error: action.data.error, login: false};

    default :
      return state
  }
}