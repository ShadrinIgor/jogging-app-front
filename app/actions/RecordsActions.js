import request from 'superagent';
import moment from 'moment';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {GET_LIST, SAVE_RECORD, GET_RECORD} from '../constants/records';
import {getJWT} from '../utils/AuthUtil';

export function save(data) {
  console.log('save', data);
  return dispatch => {
    let obj = data._id ? request.put(`${CONFIG.apiURL}/api/records`, data) : request.post(`${CONFIG.apiURL}/api/records`, data);
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

export function getRecord(id) {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/records/${id}`)
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
          data.fields.date = moment(data.fields.date).format("DD.MM.YYYY");
          console.log('data', data);
        }

        dispatch({
          type: `${GET_RECORD}${status}`,
          data
        });
      })
  };
}
