import request from 'superagent';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {AUTH_LOGIN, SET_LOCAL_STORE} from '../constants/Auth';

export function authLogin(email, password) {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN
    });

    return request
      .post(`${CONFIG.apiURL}/api/auth`, {email, password})
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
          type: `${AUTH_LOGIN}${status}`,
          data
        });
      })
  };
}

export function setLocalStore(data) {
  return dispatch => {
    dispatch({
      type: SET_LOCAL_STORE,
      data
    });
  }
}


