import {GET_REPORT} from '../constants/reports';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {list: [], status: ''};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${GET_REPORT}${_SUCCESS}` :
      return {items: action.data.data.items};

    case `${GET_REPORT}${_FAILURE}` :
      return {error: action.data.error};

    default :
      return state
  }
}