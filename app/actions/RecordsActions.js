import request from 'superagent';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {GET_LIST, SAVE_RECORD} from '../constants/records';
import {getJWT} from '../utils/AuthUtil';

export function save(data) {
  const method = data.id ? 'PUT' : 'POST';
  return dispatch => {
    return request
      .post(`${CONFIG.apiURL}/api/records`, data)
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
        }

        console.log(`${SAVE_RECORD}${status}`, data);
        dispatch({
          type: `${SAVE_RECORD}${status}`,
          data
        });
      })
  };
}

export function getList() {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/records`)
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

