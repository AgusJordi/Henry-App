import axios from "axios";
import {
  GET_ALL_USERS,
  USER_LOGIN,
  ONLINE_USER_ERROR,
  GET_ALL_COHORTES,
} from "../actions/index";
//var ls = require('local-storage');

const initialState = {
  all_users: [],
  all_cohortes: [],
  onlineUser: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: action.payload,
      };

    case USER_LOGIN:
      return {
        ...state,
        onlineUser: action.payload,
      };
    case ONLINE_USER_ERROR:
      return {
        ...state,
        onlineUser: false,
      };

    case GET_ALL_COHORTES:
      return {
        ...state,
        all_cohortes: action.payload,
      };
    default:
      return state;
  }
};

// function reducerlogin(data){///Login devuelvo falce si no devuelve data
//   if(data){
//     return data
//   }else {
//     return false
//   }
// }

export default reducer;
