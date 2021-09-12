import { fetchUsers, deleteUsers } from '../../services/adminService';
import { GET_USERS_LIST, DELETE_USERS_BY_IDS } from '../actionTypes/adminActionType';

export const getUsersList = () => async (dispatch) => {
  try {
    const res =  await fetchUsers();
    if(res.status === 200){
      dispatch({
        type: GET_USERS_LIST,
        payload: res.data,
      });
    }
  } catch(err){
    console.log(err);
    throw err.message;
  }
}

export const deleteUsersByIds = (ids=[], callBack) => async (dispatch) => {
  try {
    const res =  await deleteUsers();
    if(res.status === 200){
      dispatch({
        type: DELETE_USERS_BY_IDS,
        payload: ids,
      });
      callBack('successfully deleted');
    }
  } catch(err){
    console.log(err);
    throw err.message;
  }
}