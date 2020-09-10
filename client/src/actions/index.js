import axios from "axios";
//var ls = require('local-storage');

export const GET_ALL_USERS = 'GET_ALL_USERS';



export function getAllUsers (idUser) {
    return function(dispatch) {
      
      //return axios.get( `http://img.omdbapi.com/?s=${idUser}`)
      return axios.get( `https://www.etnassoft.com/api/v1/get/?id=${idUser}`)
        .then(result => result.data)
        .then(data => {
          dispatch({
            type: GET_ALL_USERS,
            payload: data
            
          })
          console.log(data);
        })
      
    };
  }

 