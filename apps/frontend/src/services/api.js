// "build": "rimraf dist && tsc --project tsconfig.build.json",

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async (page = 1, limit = 10, search = '') => {
  const response = await api.get('/users', {
    params: { page, limit, search },
  });
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};