'use strict';

const TOKEN_KEY = 'JAPP_TOKEN';
const USER_KEY = 'JAPP_USER';
let jwt =' ';

export const setLocalStoreData = (data) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  jwt = `JWT ${data.token}`;
};

export const getLocalStoreData = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  jwt = `JWT ${token}`;
  return {token, user}
};

export const clearLocalStoreData = () => {
  console.log('Удаляю');
  const token = localStorage.removeItem(TOKEN_KEY);
  const user = localStorage.removeItem(USER_KEY);
  jwt = '';
  return true;
};

export const isAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  jwt = `JWT ${token}`;
  return !!token && !!user;
};

export const getJWT = () => {
  return jwt;
};
