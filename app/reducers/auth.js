import {setLocalStoreData} from '../utils/AuthUtil';
import {AUTH_LOGIN, SET_LOCAL_STORE} from '../constants/Auth';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${AUTH_LOGIN}${_SUCCESS}` :
      setLocalStoreData(action.data);
      return {...state, data: action.data, login: true};

    case `${AUTH_LOGIN}${_FAILURE}` :
      return {...state, error: action.data.error, login: false};

/*    case SET_LOCAL_STORE :
      console.log('data', action.data);
      localStorage.setItem('state', 'off');
      return {...state, auth: true, user: action.data};*/

    default :
      return state
  }
}