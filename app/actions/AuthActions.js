import request from 'superagent';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {AUTH_LOGIN, LOG_OUT, SET_AUTH} from '../constants/Auth';

export function authLogin(email, password) {
  return dispatch => {
    return request
      .post(`${CONFIG.apiURL}/api/auth`, {email, password})
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
          type: `${AUTH_LOGIN}${status}`,
          data
        });
      })
  };
}

export function logOut() {
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
}

