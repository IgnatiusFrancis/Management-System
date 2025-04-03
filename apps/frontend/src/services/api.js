// "build": "rimraf dist && tsc --project tsconfig.build.json",

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://management-system-dkam.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async (page = 1, limit = 40, search = '') => {
  const response = await api.get('/users', {
    params: { page, limit, search },
  });
  return response.data;
};

export const getUser = async (id) => {
  console.log('Fetching user with ID:', id);
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


export const addUser = async (userData) => { 
  const response = await api.post(`/users`, userData);
    return  response.data;
};