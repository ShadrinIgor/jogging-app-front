import request from 'superagent';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {GET_LIST} from '../constants/records';

export function getList() {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/records`)
      //      .set({'Authorization': AuthUtil.hasAuthCookie()})
      .end((error, response) => {
        let status = '',
          data = {};
        if (error) {
          status = _FAILURE;
          data.error = response.body.error
        }
        else {
          status = _SUCCESS;
          data = response.body;
        }

        dispatch({
          type: `${GET_LIST}${status}`,
          data
        });
      })
  };
}

/*export function logOut() {
  return dispatch => {
    dispatch({
      type: `${LOG_OUT}${_SUCCESS}`
    });
  }
}

export function setAuth(data) {
  return dispatch => {
    dispatch({
      type: `${SET_AUTH}${_SUCCESS}`,
      data
    });
  }
}*/

