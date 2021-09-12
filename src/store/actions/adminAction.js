import { fetchUsers } from '../../services/adminService';
import { GET_USERS_LIST } from '../actionTypes/adminActionType';

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