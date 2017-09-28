import {GET_MAIN_LIST, UPDATE_CARDS} from '../constants/Items';
import {_SUCCESS} from '../constants/baseTypes';

const initialState = {
  items: []
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case GET_MAIN_LIST + _SUCCESS :
      return {...state, list: action.main_list}
    default :
      return state
  }
}