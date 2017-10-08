import request from 'superagent';
import moment from 'moment';
import {_FAILURE, _SUCCESS} from '../constants/baseTypes';
import {GET_REPORT} from '../constants/reports';
import {getJWT} from '../utils/AuthUtil';

export function getReports() {
  return dispatch => {
    return request
      .get(`${CONFIG.apiURL}/api/reports`)
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
          type: `${GET_REPORT}${status}`,
          data
        });
      })
  };
}