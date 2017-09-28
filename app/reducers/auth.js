import {AUTH_LOGIN} from '../constants/Auth';
import {_SUCCESS} from '../constants/baseTypes';

const initialState = {
  auth: []
};

export default function main(state = initialState, action) {

  switch (action.type) {

    case `${AUTH_LOGIN}${_SUCCESS}` :
      return {...state, auth: action.auth};

    default :
      return state
  }

}