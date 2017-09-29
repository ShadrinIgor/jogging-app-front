import request from 'superagent';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {CREATE_USER} from '../constants/users';

export function createUser(data) {
  return dispatch => {
    dispatch({
      type: CREATE_USER
    });

    return request
      .post(`${CONFIG.apiURL}/api/users`, data)
      //      .set({'Authorization': AuthUtil.hasAuthCookie()})
      .ok(response => {
        console.log('res', response);
      })
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
          type: `${CREATE_USER}${status}`,
          data
        });
      })
  };
}

