import {SAVE_USER, GET_USER, USER_CLEAR_DATA} from '../constants/users';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';

const initialState = {
  _id: '',
  email: '',
  name: '',
  surname: '',
  password: '',
  role: '',

  status: '',
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SAVE_USER}${_SUCCESS}` :
      return {...initialState, status: _SUCCESS};

    case `${SAVE_USER}${_FAILURE}` :
      return {...state, errors: action.data.errors, status: 'error'};

    case `${GET_USER}${_SUCCESS}` :
      return {...initialState, ...action.data.fields};

    case `${GET_USER}${_FAILURE}` :
      return {...state, errors: action.data.errors, status: 'error'};

    case `${USER_CLEAR_DATA}${_FAILURE}` :
      return initialState;

    default :
      return state
  }
}