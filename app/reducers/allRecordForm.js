import {SAVE_ALL_RECORD, GET_ALL_RECORD, RECORD_ALL_CLEAR_FORM_DATA} from '../constants/allRecords';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {
  _id: '',
  userId: '',
  date: '',
  distance: '',
  time: '',

  status: '',
  errors: {},
  users: {}
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

    case `${RECORD_ALL_CLEAR_FORM_DATA}${_SUCCESS}` :
      return {...initialState};

    default :
      return state
  }
}