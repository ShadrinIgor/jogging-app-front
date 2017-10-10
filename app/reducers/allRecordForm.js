import {SAVE_ALL_RECORD, GET_ALL_RECORD} from '../constants/allRecords';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {
  _id: '',
  email: '',
  date: '',
  distance: '',
  time: '',

  status: '',
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SAVE_ALL_RECORD}${_SUCCESS}` :
      return {...initialState, status: _SUCCESS};

    case `${SAVE_ALL_RECORD}${_FAILURE}` :
      return {...state, errors: action.data.errors, status: 'error'};

    case `${GET_ALL_RECORD}${_SUCCESS}` :
      return {...initialState, ...action.data.fields};

    case `${GET_ALL_RECORD}${_FAILURE}` :
      return {...state, errors: action.data.errors, status: 'error'};

    default :
      return state
  }
}