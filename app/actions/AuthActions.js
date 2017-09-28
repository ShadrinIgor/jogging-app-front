import {_SUCCESS} from '../constants/baseTypes';
import {AUTH_LOGIN} from '../constants/Auth';

export function authLogin(email, password) {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN
    });

    return request
      .get(`${CONFIG.apiURL}/api/auth`)
      .set({email, password})
      //      .set({'Authorization': AuthUtil.hasAuthCookie()})
      .ok(response => {
        console.log('res', response);
      }) // ActionUtil.processError(dispatch, COURSES_GET_NEW_FAIL, response
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: `${AUTH_LOGIN}${_SUCCESS}`,
          auth: payload
        });
      })
  };
}

