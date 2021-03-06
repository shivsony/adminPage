import * as api from '../api';
import { API_ROUTES } from '../utils/constants';

export const fetchUsers = async () => {
  try {
    const url = API_ROUTES.getUsersList;
    const response = await api.GET(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const toLowerCase = str => {
  return typeof str === 'string' ? str.toLocaleLowerCase() : str
}

export const searchUserByUserInput = (searchString, users) => {
  try {
    return users.filter(user => toLowerCase(user.name).includes(toLowerCase(searchString)) || toLowerCase(user.email).includes(toLowerCase(searchString)) || toLowerCase(user.role).includes(toLowerCase(searchString)));
  } catch (error) {
    throw error;
  }
};

export const deleteUsers = () => {
  try {
    const response = {status: 200}; // await api.DELETE('Delete');
    return response;
  } catch (error) {
    throw error;
  }
}

export const updateAuser = () => {
  try {
    const response = {status: 200}; // await api.PUT('update');
    return response;
  } catch (error) {
    throw error;
  }
}

export const addNewUser = () => {
  try {
    const response = {status: 200}; // await api.POST('add', data);
    return response;
  } catch (error) {
    throw error;
  }
}