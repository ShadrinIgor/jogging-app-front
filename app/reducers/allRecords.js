import {GET_ALL_LIST, DELETE_ALL_RECORD, RECORD_ALL_CLEAR_STATUS} from '../constants/allRecords';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {list:[], status: ''};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${GET_ALL_LIST}${_SUCCESS}` :
      return {items: action.data.data.items};

    case `${GET_ALL_LIST}${_FAILURE}` :
      return {error: action.data.error};

    case `${DELETE_ALL_RECORD}${_SUCCESS}` :
      return {items: action.data.items, status: 'deleted'};

    case `${DELETE_ALL_RECORD}${_FAILURE}` :
      return {...state, error: action.data.error, status: 'error_delete'};

    case `${RECORD_ALL_CLEAR_STATUS}${_SUCCESS}` :
      return {...state, status: ''};

    default :
      return state
  }
}