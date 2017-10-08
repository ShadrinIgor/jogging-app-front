import {GET_LIST, DELETE_RECORD, RECORD_CLEAR_STATUS} from '../constants/records';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {list:[], status: ''};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${GET_LIST}${_SUCCESS}` :
      return {items: action.data.data.items};

    case `${GET_LIST}${_FAILURE}` :
      return {error: action.data.error};

    case `${DELETE_RECORD}${_SUCCESS}` :
      return {items: action.data.items, status: 'deleted'};

    case `${DELETE_RECORD}${_FAILURE}` :
      return {...state, error: action.data.error, status: 'error_delete'};

    case `${RECORD_CLEAR_STATUS}${_SUCCESS}` :
      return {...state, status: ''};

    default :
      return state
  }
}