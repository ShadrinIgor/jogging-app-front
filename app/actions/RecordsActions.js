import request from 'superagent';
import moment from 'moment';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {GET_LIST, SAVE_RECORD, GET_RECORD, DELETE_RECORD, RECORD_CLEAR_STATUS, RECORD_CLEAR_FORM_DATA} from '../constants/records';
import {getJWT} from '../utils/AuthUtil';

export function save(data) {
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

export function getList(sort, filter) {
  let dopUrl = '';
  if(sort && sort.field){
    dopUrl += `?sort=${sort.field}&type=${sort.type}`;
  }
  if(filter){
    Object.keys(filter).map(field=>{
      if(filter[field])dopUrl += `${dopUrl.length ? '&' : '?'}filter[${field}]=${filter[field]}`;
    });
  }

  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/records/${dopUrl}`)
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
        }

        dispatch({
          type: `${GET_RECORD}${status}`,
          data
        });
      })
  };
}

export function deleteItem(id) {
  return dispatch => {
    return request.delete(`${CONFIG.apiURL}/api/records/${id}`)
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
          type: `${DELETE_RECORD}${status}`,
          data
        });
      })
  };
}

export function clearStatus() {
  return dispatch => {
    dispatch({
      type: `${RECORD_CLEAR_STATUS}${_SUCCESS}`
    });
  }
}

export function clearFormData() {
  return dispatch => {
    dispatch({
      type: `${RECORD_CLEAR_FORM_DATA}${_SUCCESS}`
    });
  }
}