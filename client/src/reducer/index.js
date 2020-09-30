import axios from "axios";
import {
  GET_ALL_USERS,
  USER_LOGIN,
  ONLINE_USER_ERROR,
  GET_ALL_COHORTES,
  GET_ID_USER,
  GET_ALL_INSTRUCTORS,
  USER_REGISTER,
  USER_REGISTER_ERROR,
  GET_ALL_STUDENTS,
  MODIFIED_USER,
  MODIFIED_STUDENT,
  GET_ALL_PMS,
  GET_ALUMNOS_FROM_COHORTE,
  GET_STUDENT_FROM_USERID,
  GET_COHORTES_BY_USERID,
  MODIFIED_COHORTE_INSTRUCTOR,
  DELETE_USER_BY_ID,
  GET_MODIF_COHORTE,
  GET_ALL_GROUPS,
  MODIFIED_GROUPS,
  GET_COHORTES_BY_ID,
  DELETE_STUDENT_BY_ID,
} from "../actions/index";

const initialState = {
  all_users: [],
  all_cohortes: [],
  onlineUser: false,
  id_user: [],
  all_instructors: [],
  register: 0,
  all_students: [],
  all_pms: [],
  students_from_cohorte: [],
  student_from_userId: {},
  all_groups: [],
  all_cohortes_by_userId: [],
  modified_user: [],
  cohorte_by_id: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: action.payload,
      };
    case GET_ID_USER:
      return {
        ...state,
        id_user: action.payload,
      };
    case MODIFIED_USER:
      return {
        ...state,
        modified_user: action.payload,
      };
    case MODIFIED_STUDENT:
      return {
        ...state,
        id_student: action.payload,
      };

    case USER_LOGIN:
      return {
        ...state,
        onlineUser: action.payload,
      };
    case GET_MODIF_COHORTE:
      return {
        ...state,
        all_cohortes: action.payload,
      };

    case ONLINE_USER_ERROR:
      return {
        ...state,
        onlineUser: false,
      };
    case USER_REGISTER:
      return {
        ...state,
        register: registro(action.payload),
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        register: 0,
      };

    case GET_ALL_COHORTES:
      return {
        ...state,
        all_cohortes: action.payload,
      };

    case GET_ALL_INSTRUCTORS:
      return {
        ...state,
        all_instructors: action.payload,
      };

    case GET_ALL_STUDENTS:
      return {
        ...state,
        all_students: action.payload,
      };

    case GET_ALL_PMS:
      return {
        ...state,
        all_pms: action.payload,
      };

    case GET_ALUMNOS_FROM_COHORTE:
      return {
        ...state,
        students_from_cohorte: action.payload,
      };
    case GET_ALL_GROUPS:
      return {
        ...state,
        all_groups: action.payload,
      };
    case MODIFIED_GROUPS:
      return {
        ...state,
        all_groups: action.payload,
      };

    case GET_COHORTES_BY_USERID:
      return {
        ...state,
        all_cohortes_by_userId: [
          ...state.all_cohortes_by_userId,
          ...action.payload,
        ],
      };

    case DELETE_USER_BY_ID:
      return {
        ...state,
        all_users: action.payload,
      };

    case GET_STUDENT_FROM_USERID: {
      const { payload } = action;
      if (!payload) return state;

      return {
        ...state,
        student_from_userId: {
          ...state.student_from_userId,
          [action.payload.userId]: action.payload,
        },
      };
    }
    case GET_COHORTES_BY_ID:
      return {
        ...state,
        cohorte_by_id: action.payload,
      };
    case DELETE_STUDENT_BY_ID:
      return {
        ...state,
        all_students: action.payload,
      };

    case MODIFIED_COHORTE_INSTRUCTOR: {
      // return {
      //   ...state,
      //   all_cohortes: [state.all_cohortes, action.payload],
      // };
      return {
        ...state,
        all_cohortes: [
          ...state.all_cohortes.map((elem) => {
            if (elem.id == action.payload.id) {
              return {
                ...elem,
                instructorId: action.payload.instructorId,
                date: action.payload.date,
              };
            } else {
              return elem;
            }
          }),
        ],
      };
    }

    default:
      return state;
  }
};

function registro(data) {
  if (data === false) {
    return false;
  } else if (data === null) {
    return "null";
  } else {
    return true;
  }
}

export default reducer;
