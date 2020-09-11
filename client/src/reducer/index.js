import axios from "axios";
import { GET_ALL_USERS, USER_LOGIN } from '../actions/index';
//var ls = require('local-storage');

const initialState = {
  all_users: [],
  onlineUser: false

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: action.payload
      }  
      
      case USER_LOGIN:
      return {
        ...state,
        onlineUser: action.payload
      }

    default:
      return state;
  }

  
 
}

// function reducerlogin(data){///Login devuelvo falce si no devuelve data
//   if(data){
//     return data
//   }else {
//     return false
//   }
// }

export default reducer;

 
