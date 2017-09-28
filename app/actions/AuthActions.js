import request from 'superagent';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {AUTH_LOGIN} from '../constants/Auth';

export function authLogin(email, password) {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN
    });

    return request
      .post(`${CONFIG.apiURL}/api/auth`, {email, password})
      //.set({email, password})
      //      .set({'Authorization': AuthUtil.hasAuthCookie()})
      .ok(response => {
        console.log('res', response);
      }) // ActionUtil.processError(dispatch, COURSES_GET_NEW_FAIL, response
      .end((error, response) => {
        console.log('1', error, response);
        let status = '',
          data = {};
        if (error) {
          status = _FAILURE;
          data.error = response.body.error
        }
        else status = _SUCCESS;

        dispatch({
          type: `${AUTH_LOGIN}${status}`,
          data
        });
      })
  };
}

