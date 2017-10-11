import {SAVE_RECORD, GET_RECORD, RECORD_CLEAR_FORM_DATA} from '../constants/records';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {
  _id: '',
  date: '',
  distance: '',
  time: '',

  status: '',
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SAVE_RECORD}${_SUCCESS}` :
      return {...initialState, status: _SUCCESS};

    case `${SAVE_RECORD}${_FAILURE}` :
      return {...state, errors: action.data.errors, status: 'error'};

    case `${GET_RECORD}${_SUCCESS}` :
      return {...initialState, ...action.data.fields};

    case `${GET_RECORD}${_FAILURE}` :
      return {...state, errors: action.data.errors, status: 'error'};

    case `${RECORD_CLEAR_FORM_DATA}${_SUCCESS}` :
      return initialState;

    default :
      return state
  }
}