import produce from 'immer';
import { GET_USERS_LIST } from '../actionTypes/adminActionType';


const initialState = {
  userList: []
};

export function admin(state = initialState, action){
  return produce(state, draft => {
    switch (action.type){
      case GET_USERS_LIST:
        draft.userList = action.payload;
        break;
      default:
        return state;
    }
  })
}