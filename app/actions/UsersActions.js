import request from 'superagent';
import {getJWT} from '../utils/AuthUtil';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  LIST_USER,
  SAVE_USER,
  USER_CLEAR_DATA,
  USER_CLEAR_STATUS
} from '../constants/users';

export function createUser(data) {
  return dispatch => {
    dispatch({
      type: CREATE_USER
    });

    return request
      .post(`${CONFIG.apiURL}/api/users/registration`, data)
      .end((error, response) => {
        let status = '',
          data = {};
        if (error) {
          status = _FAILURE;
          data.error = response.body.error
        }
        else {
          status = _SUCCESS;
          data = {user: response, status: 'created'};
        }

        dispatch({
          type: `${CREATE_USER}${status}`,
          data
        });
      })
  };
}

export function save(data) {
  return dispatch => {
    let obj = data._id ? request.put(`${CONFIG.apiURL}/api/users`, data) : request.post(
      `${CONFIG.apiURL}/api/users`, data);
    return obj.set({'Authorization': getJWT()})
      .end((error, response) => {
        let status = '',
          data = {};
        if (error) {
          status = _FAILURE;
          data.errors = {};
          Object.keys(response.body.error.errors).map(item => {
            const error = response.body.error.errors[item];
            data.errors[error.path] = error.message;
          });
        }
        else {
          status = _SUCCESS;
        }

        dispatch({
          type: `${SAVE_USER}${status}`,
          data
        });
      })
  };
}

export function getList() {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/users`)
      .set({'Authorization': getJWT()})
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
          type: `${LIST_USER}${status}`,
          data
        });
      })
  };
}

export function getUser(id) {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/users/${id}`)
      .set({'Authorization': getJWT()})
      .end((error, response) => {
        let status = '',
          data = {};

        if (error) {
          status = _FAILURE;
          data.error = response.body.error
        }
        else {
          status = _SUCCESS;
          data.fields = response.body.data;
        }

        dispatch({
          type: `${GET_USER}${status}`,
          data
        });
      })
  };
}

export function deleteItem(id) {
  return dispatch => {
    return request.delete(`${CONFIG.apiURL}/api/users/${id}`)
      .set({'Authorization': getJWT()})
      .end((error, response) => {
        let status = '',
          data = {};
        if (error) {
          status = _FAILURE;
          data.errors = {};
          Object.keys(response.body.error.errors).map(item => {
            const error = response.body.error.errors[item];
            data.errors[error.path] = error.message;
          });
        }
        else {
          status = _SUCCESS;
          data.items = response.body.data.items
        }

        dispatch({
          type: `${DELETE_USER}${status}`,
          data
        });
      })
  };
}

export function clearStatus() {
  return dispatch => {
    dispatch({
      type: `${USER_CLEAR_STATUS}${_SUCCESS}`
    });
  }
}

export function clearData() {
  return dispatch => {
    dispatch({
      type: `${USER_CLEAR_DATA}${_SUCCESS}`
    });
  }
}