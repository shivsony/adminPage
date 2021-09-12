import produce from 'immer';
import { GET_USERS_LIST, DELETE_USERS_BY_IDS } from '../actionTypes/adminActionType';


const initialState = {
  userList: []
};

export function admin(state = initialState, action){
  return produce(state, draft => {
    switch (action.type){
      case GET_USERS_LIST:
        draft.userList = action.payload;
        break;
      case DELETE_USERS_BY_IDS:
        draft.userList = draft.userList.filter(user => !action.payload.includes(user.id));
        break;
      default:
        return state;
    }
  })
}