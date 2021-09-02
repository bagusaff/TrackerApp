import {
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_FAILURE,
  ORDER_FETCH_SUCCESS,
} from "../constants";

import axios from "axios";

import Toast from "react-native-toast-message";

import { API_URL } from "@env";

export const fetchOrders = (token) => (dispatch) => {
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  dispatch({ type: ORDER_FETCH_REQUEST });
  axios
    .get(API_URL + "/orders", { headers })
    .then((res) => {
      dispatch({ type: ORDER_FETCH_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: ORDER_FETCH_FAILURE, payload: err.response.data });
      console.log(err.response.data);
    });
};

export const updateLocations =
  (token, longitude, latitude, orderId) => (dispatch) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    };
  };
