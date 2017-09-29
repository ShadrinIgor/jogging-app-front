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
      .end((error, response) => {
        let status = '',
          data = {};
        if (error) {
          status = _FAILURE;
          data.error = response.body.error
        }
        else {
          status = _SUCCESS;
          data = {user:response, status: 'created'};
        }

        dispatch({
          type: `${CREATE_USER}${status}`,
          data
        });
      })
  };
}

