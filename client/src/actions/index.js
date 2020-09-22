import axios from "axios";
//var ls = require('local-storage');

export const USER_LOGIN = "LOGIN_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const ONLINE_USER_ERROR = "ONLINE_USER_ERROR";
export const GET_ALL_COHORTES = "GET_ALL_COHORTES";
export const CREATE_COHORTE = "CREATE_COHORTE";
export const GET_ID_USER = "GET_ID_USER";
export const CREATE_USERS_STUDENTS = "CREATE_USERS_STUDENTS";
export const GET_ALL_INSTRUCTORS = "GET_ALL_INSTRUCTORS";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";

export function userLogIn(body) {
  return function (dispatch) {
    return axios
      .post("http://localhost:4000/login", body)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: USER_LOGIN,
          payload: data == false ? 0 : data,
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

export function createCohorte(info, emails) {
  console.log(emails, info, "ACA ESTOY EN ACTIONS");
  var url = "http://localhost:4000/users/add";
  axios({
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      cohorte: {
        name: info.cohorte,
        instructorId: info.instructorId,
        date: info.DateA,
      },
      emails,
      /*   name: info.cohorte,
        instructorId: info.instructor,
        date: info.DateA */
    },
  });
}

export function getIdUser(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:4000/users/${id}`)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ID_USER,
          payload: data,
        });
      });
  };
}

export function getAllInstructors() {
  return function (dispatch) {
    return axios
      .get("http://localhost:4000/users/instructor")
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ALL_INSTRUCTORS,
          payload: data,
        });
      });
  };
}


export function modifiedUser(id, data) {
  console.log(data, "SOY UNA DAAAAAAAAAAAAATA")
  export function modifiedUser(id, data) {
    var url = `http://localhost:4000/users/myprofile/${id}`;
    axios({
      method: "put",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
  }

  export function modifiedPassword(id, data) {
    console.log(data, "SOY UNA DAAAAAAAAAAAAATA")
    var url = `http://localhost:4000/users/${id}/passwordReset`;
    axios({
      method: "put",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data
    });
  }

  export function modifiedCohorte(cohorte) {
    console.log(cohorte, "SOY COHORTE")
    var url = `http://localhost:4000/cohorte/${cohorte.id}`;
    axios({
      method: "put",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: cohorte
    });
  }

  export function getAllStudents() {
    return function (dispatch) {
      return axios
        .get(`http://localhost:4000/students/`)
        .then((result) => result.data)
        .then((data) => {
          dispatch({
            type: GET_ALL_STUDENTS,
            payload: data,
          });
        });
    };
  }

