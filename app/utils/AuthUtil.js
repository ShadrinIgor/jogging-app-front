'use strict';

const TOKEN_KEY = 'JAPP_TOKEN';
const USER_KEY = 'JAPP_USER';

export const setLocalStoreData = (data) => {
  console.log('data', data.token, data.user.email, data.user.id);
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
};

export const getLocalStoreData = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return {token, user}
};


