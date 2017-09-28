import {_SUCCESS} from '../constants/baseTypes'
import {AUTH_LOGIN} from '../constants/Auth'

export function authLogin() {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN
    });

    return request
      .get(`${CONFIG.apiURL}/api`)
      .set({'Authorization': AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, COURSES_GET_NEW_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: COURSES_GET_NEW_SUCCESS,
          payload: payload
        });
      })
  };
}

