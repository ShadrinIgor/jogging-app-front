import request from 'superagent';
import moment from 'moment';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {
  DELETE_ALL_RECORD,
  GET_ALL_LIST,
  GET_ALL_RECORD,
  RECORD_ALL_CLEAR_STATUS,
  SAVE_ALL_RECORD,
  RECORD_ALL_CLEAR_FORM_DATA
} from '../constants/allRecords';
import {getJWT} from '../utils/AuthUtil';

export function save(data) {
  return dispatch => {
    let obj = data._id ? request.put(`${CONFIG.apiURL}/api/all_records`, data) : request.post(
      `${CONFIG.apiURL}/api/all_records`, data);
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
          type: `${SAVE_ALL_RECORD}${status}`,
          data
        });
      })
  };
}

export function getList(sort) {
  let dopUrl = '';
  if(sort){
    dopUrl += `?sort=${sort.field}&type=${sort.type}`;
  }
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/all_records/${dopUrl}`)
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
          type: `${GET_ALL_LIST}${status}`,
          data
        });
      })
  };
}

export function getRecord(id) {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/all_records/${id}`)
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
          data.fields.date = moment(data.fields.date).format('DD.MM.YYYY');
        }

        dispatch({
          type: `${GET_ALL_RECORD}${status}`,
          data
        });
      })
  };
}

export function deleteItem(id) {
  return dispatch => {
    return request.delete(`${CONFIG.apiURL}/api/all_records/${id}`)
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
          type: `${DELETE_ALL_RECORD}${status}`,
          data
        });
      })
  };
}

export function clearStatus() {
  return dispatch => {
    dispatch({
      type: `${RECORD_ALL_CLEAR_STATUS}${_SUCCESS}`
    });
  }
}

export function clearFormData() {
  return dispatch => {
    dispatch({
      type: `${RECORD_ALL_CLEAR_FORM_DATA}${_SUCCESS}`
    });
  }
}