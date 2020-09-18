import axios from "axios";
//var ls = require('local-storage');

export const USER_LOGIN = "LOGIN_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const ONLINE_USER_ERROR = "ONLINE_USER_ERROR";
export const GET_ALL_COHORTES = "GET_ALL_COHORTES";
export const CREATE_COHORTE = "CREATE_COHORTE";
export const GET_ID_USER = "GET_ID_USER";

export function userLogIn(body) {
  return function (dispatch) {
    return axios.post("http://localhost:4000/login",body)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: USER_LOGIN,
          payload: data == false ? 0 : data 
        });
      });
  };
}
export function onlineUserError() {
  return {
    type: ONLINE_USER_ERROR,
  };
}

export function getAllUsers() {
  return function (dispatch) {
    return axios
      .get("http://localhost:4000/users")
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: data,
        });
      });
  };
}

export function getAllCohortes() {
  return function (dispatch) {
    return axios
      .get("http://localhost:4000/cohorte")
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ALL_COHORTES,
          payload: data,
        });
      });
  };
}

export function createCohorte(info) {
  console.log(info, "ACA ESTOY EEEEEEEEEEEEEEEEEEEEEEEEEEEEN ACTIONS")
    var url = "http://localhost:4000/cohorte";
    axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
          name: info.cohorte,
          // description: info.instructor,
          date: info.DateA,

        },
    });
}

export function getIdUser(id) {
  console.log(id,"QUE RECIBO EN ACTIOOOOON")
  return function (dispatch) {
    return axios
      .get(`http://localhost:4000/users/${id}`)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ID_USER,
          payload: data,
        });
        console.log(data,"AAAAAAAAAAAAAAAAAAAAAAAAAsi esta data")
      });
  };
}
