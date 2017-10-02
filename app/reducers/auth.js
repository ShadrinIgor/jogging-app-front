import {setLocalStoreData} from '../utils/AuthUtil';
import {AUTH_LOGIN, LOG_OUT} from '../constants/Auth';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${AUTH_LOGIN}${_SUCCESS}` :
      setLocalStoreData(action.data);
      return {data: action.data, login: true};

    case `${AUTH_LOGIN}${_FAILURE}` :
      return {error: action.data.error, login: false};

    case `${LOG_OUT}${_SUCCESS}` :
      return {login: false};

    default :
      return state
  }
}