import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
} from "../constants";

import axios from "axios";

import Toast from "react-native-toast-message";

import { API_URL } from "@env";

export const loginHandle = (email, password) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  axios
    .post(
      API_URL + "/users/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      Toast.show({
        type: "success",
        text1: res.data.message,
      });
    })
    .catch((err) => {
      dispatch({ type: USER_LOGIN_FAILURE, payload: err.response.data });
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
    });
};

export const logoutHandle = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  Toast.show({
    type: "success",
    text1: "Berhasil Logout!",
  });
};
