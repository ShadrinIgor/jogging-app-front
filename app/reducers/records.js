import {GET_LIST} from '../constants/records';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {list:[]};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${GET_LIST}${_SUCCESS}` :
      return {items: action.data.data.items};

    case `${GET_LIST}${_FAILURE}` :
      return {error: action.data.error};

    default :
      return state
  }
}