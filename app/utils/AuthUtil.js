'use strict';

const TOKEN_KEY = 'JAPP_TOKEN';
const USER_KEY = 'JAPP_USER';

export const setLocalStoreData = (data) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
};

export const getLocalStoreData = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return {token, user}
};

export const clearLocalStoreData = () => {
  const token = localStorage.removeItem(TOKEN_KEY);
  const user = localStorage.removeItem(USER_KEY);
  return true;
};