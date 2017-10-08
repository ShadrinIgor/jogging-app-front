'use strict';

import moment from 'moment';
export const required = (val) => val && val.length > 0;

export const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
};

export const isPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone)
};

export const validateNumber = (field, value, errors = {}) => {
  const reg = /([^0-9])+/;
  if (reg.test(value)) {
    errors[field] = ['Incorrect format'];
  } else {
    delete errors[field];
  }
};

export const validateDate = (field, value, errors = {}) => {
  const newDate = moment(value, 'DD.MM.YYYY', true);
  // this.props.recordForm[field] = moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY');

  if (!newDate || !newDate.isValid()) {
    errors[field] = ['Incorrect date format, it should be DD.MM.YYYY'];
  } else {
    delete errors[field];
  }
};