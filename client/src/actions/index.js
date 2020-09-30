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
export const USER_REGISTER = "USER_REGISTER";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const MODIFIED_USER = "MODIFIED_USER";
export const MODIFIED_STUDENT = "MODIFIED_STUDENT";
export const GET_ALL_PMS = "GET_ALL_PMS";
export const GET_ALUMNOS_FROM_COHORTE = "GET_ALUMNOS_FROM_COHORTE";
export const GET_STUDENT_FROM_USERID = "GET_STUDENT_FROM_USERID";
export const GET_ALL_GROUPS = "GET_ALL_GROUPS";
export const GET_COHORTES_BY_USERID = "GET_COHORTES_BY_USERID";
export const MODIFIED_COHORTE_INSTRUCTOR = "MODIFIED_COHORTE_INSTRUCTOR";
export const DELETE_USER_BY_ID = "DELETE_USER_BY_ID";
export const PASWORD_RESET_EMAIL = "PASWORD_RESET_EMAIL";
export const GET_MODIF_COHORTE = "GET_MODIF_COHORTE";
export const MODIFIED_GROUPS = "MODIFIED_GROUPS";
export const GET_COHORTES_BY_ID = "GET_COHORTES_BY_ID";
export const DELETE_COHORTE = "DELETE_COHORTE";
export const DELETE_STUDENT_BY_ID = "DELETE_STUDENT_BY_ID";

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
      .get(`http://localhost:4000/cohorte`)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ALL_COHORTES,
          payload: data,
        });
      });
  };
}

export function getCohortesById(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:4000/cohorte/${id}`)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_COHORTES_BY_ID,
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

export function getAllPms() {
  return function (dispatch) {
    return axios
      .get("http://localhost:4000/users/pms")
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ALL_PMS,
          payload: data,
        });
      });
  };
}

export function modifiedUser(id, data) {
  console.log("LE MANDO al Action", id, data);

  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/users/myprofile/${id}`, data)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: MODIFIED_USER,
          payload: data,
        });
        //console.log("QUE trae el data", data)
      });
  };
}

export function modifiedStudent(id, data) {
  console.log("LE MANDO al Action", id, data);

  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/students/${id}`, data)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: MODIFIED_STUDENT,
          payload: data,
        });
        //console.log("QUE trae el data", data)
      });
  };
}

export function modifiedCohorteInstructor(id, data) {
  console.log("LE MANDO al Action", id, data);

  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/cohorte/${id}`, data)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: MODIFIED_COHORTE_INSTRUCTOR,
          payload: data,
        });
      });
  };
}

export function modifiedPassword(id, data) {
  var url = `http://localhost:4000/users/passwordReset`;
  axios({
    method: "put",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
}

export function passwordResetEmail(body) {
  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/users/passwordResetEmail`, body)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: PASWORD_RESET_EMAIL,
          payload: body,
        });
      });
  };
}

export function userRegister(body) {
  var registro = {
    name: body.firstNameR,
    lastname: body.lastNameR,
    city: body.cityR,
    province: body.provinceR,
    country: body.countryR,
    email: body.emailR,
    password: body.passwordR,
  };

  //console.log('LE MANDO al Action',registro)

  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/users/`, registro)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: USER_REGISTER,
          payload: data,
        });
        //console.log("QUE trae el data", data)
      });
  };
}

export function userRegisterError() {
  return {
    type: USER_REGISTER_ERROR,
  };
}

export function modifiedCohorte(cohorte) {
  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/cohorte/${cohorte.id}`, cohorte)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_MODIF_COHORTE,
          payload: data,
        });
        console.log("QUE trae el data", data);
      });
  };
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

export function getAlumnosFromCohorte(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:4000/students/cohorte/${id}`)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_ALUMNOS_FROM_COHORTE,
          payload: data,
        });
      });
  };
}

export function getStudentFromUserId(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:4000/students/info/${id}`)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: GET_STUDENT_FROM_USERID,
          payload: data,
        });
      });
  };
}

export function getAllGroups(id) {
  return function (dispatch) {
    if (id) {
      return axios
        .get(`http://localhost:4000/grupos/${id}`)
        .then((res) => res.data)
        .then((data) => {
          dispatch({
            type: GET_ALL_GROUPS,
            payload: data,
          });
        });
    }
    return axios
      .get(`http://localhost:4000/grupos/`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: GET_ALL_GROUPS,
          payload: data,
        });
      });
  };
}
export function setearUsuarios(e) {
  axios
    .post("http://localhost:4000/usuarios")
    .then((res) => {
      res.status("Ok");
    })
    .catch((err) => console.log(err));
}

export function setearCohorte(e) {
  axios
    .post("http://localhost:4000/cohor")
    .then((res) => {
      res.status("Ok");
    })
    .catch((err) => console.log(err));
}

export function setearGroups(e) {
  axios
    .post("http://localhost:4000/gruposhard")
    .then((res) => {
      res.status("Ok");
    })
    .catch((err) => console.log(err));
}

export function setearStudents(e) {
  axios
    .post("http://localhost:4000/studentshard")
    .then((res) => {
      res.status("Ok");
    })
    .catch((err) => console.log(err));
}

export function getCohortesByUserId(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:4000/cohorte/instructor/${id}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: GET_COHORTES_BY_USERID,
          payload: data,
        });
      });
  };
}

export function deleteUserById(id) {
  return function (dispatch) {
    return axios
      .delete(`http://localhost:4000/users/${id}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: DELETE_USER_BY_ID,
          payload: data,
        });
      });
  };
}

export function modifiedGroup(group) {
  console.log("El GRUPO ", group);
  return function (dispatch) {
    return axios
      .put(`http://localhost:4000/grupos/${group.id}`, group)
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: MODIFIED_GROUPS,
          payload: data,
        });
        console.log("QUE trae el data", data);
      });
  };
}

export function deleteCohorte(id) {
  console.log(id);
  var url = `http://localhost:4000/cohorte/${id}`;

  axios({
    method: "delete",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id,
    },
  });
}

export function deleteGroup(id) {
  console.log(id);
  var url = `http://localhost:4000/grupos/${id}`;

  axios({
    method: "delete",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id,
    },
  });
}

export function deleteSetudentById(id) {
  return function (dispatch) {
    return axios
      .delete(`http://localhost:4000/students/delete/${id}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: DELETE_STUDENT_BY_ID,
          payload: data,
        });
      });
  };
}
