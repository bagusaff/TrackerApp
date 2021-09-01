import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
} from "../constants";

const initialState = {
  isLoggedIn: false,
  loading: false,
  userData: {},
  token: "",
  message: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userData: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        message: action.payload.message,
      };
    case USER_LOGOUT_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
