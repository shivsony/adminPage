import produce from 'immer';
import { GET_USERS_LIST, DELETE_USERS_BY_IDS, UPDATE_THE_USER, CREATE_NEW_USER } from '../actionTypes/adminActionType';


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
      case UPDATE_THE_USER:
        draft.userList[draft.userList.findIndex(user => user.id === action.payload.id)] = action.payload;
        break;
      case CREATE_NEW_USER:
        draft.userList.push(action.payload);
        break;
      default:
        return state;
    }
  })
}