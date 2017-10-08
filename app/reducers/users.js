import {CREATE_USER, GET_LIST, DELETE_USER, USER_CLEAR_STATUS} from '../constants/users';
import {_SUCCESS,_FAILURE} from '../constants/baseTypes';

const initialState = {list:[], status: ''};

export default function main(state = initialState, action) {

  switch (action.type) {

    case `${CREATE_USER}${_SUCCESS}` :
      return {...state, user: action.data.user, status: action.data.status, error: ''};

    case `${CREATE_USER}${_FAILURE}` :
      return {...state, error: action.data.error};

    case `${GET_LIST}${_SUCCESS}` :
      return {items: action.data.data.items};

    case `${GET_LIST}${_FAILURE}` :
      return {error: action.data.error};

    case `${DELETE_USER}${_SUCCESS}` :
      return {items: action.data.items, status: 'deleted'};

    case `${DELETE_USER}${_FAILURE}` :
      return {...state, error: action.data.error, status: 'error_delete'};

    case `${USER_CLEAR_STATUS}${_SUCCESS}` :
      return {...state, status: ''};

    default :
      return state
  }

}