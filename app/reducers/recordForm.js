import {SAVE_RECORD} from '../constants/records';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {
  id: '',
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
      console.log('_FAILURE', action);
      return {...state, errors: action.data.errors, status: 'error'};

    default :
      return state
  }
}