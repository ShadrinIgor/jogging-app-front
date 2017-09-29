import {CREATE_USER} from '../constants/users';
import {_SUCCESS,_FAILURE} from '../constants/baseTypes';

const initialState = {
  users: []
};

export default function main(state = initialState, action) {

  switch (action.type) {

    case CREATE_USER + _SUCCESS :
      return {...state, data: action.data};
    case CREATE_USER + _FAILURE :
      return {...state, error: action.data.error};
    default :
      return state
  }

}