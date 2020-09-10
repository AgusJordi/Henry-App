import axios from "axios";
import { GET_ALL_USERS } from '../actions/index';
//var ls = require('local-storage');

const initialState = {
  all_users: {} 

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: action.payload
      }      

    default:
      return state;
  }


 
}

export default reducer;

 
