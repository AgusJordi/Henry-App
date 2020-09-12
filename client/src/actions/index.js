import axios from "axios";
//var ls = require('local-storage');

export const USER_LOGIN = 'LOGIN_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';


export function userLogIn(body){  
 
   return function(dispatch){
     return axios.post(`https://www.etnassoft.com/api/v1/get/?id=`)    
    .then(result => result.data)
     .then(data => {
       dispatch({
         type: USER_LOGIN,
         payload: body.username === 'martin' && body.password === '1234' ? body : 0
       })
     })
   }
 }

export function getAllUsers (idUser) {
    return function(dispatch) {
      return axios.get( `https://www.etnassoft.com/api/v1/get/?id=${idUser}`)
        .then(result => result.data)
        .then(data => {
          dispatch({
            type: GET_ALL_USERS,
            payload: data
            
          })
           
        })
      
    };
  }

 