import {
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_FAILURE,
  ORDER_FETCH_SUCCESS,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_FAILURE,
  ORDER_SAVE_SUCCESS,
} from "../constants";

import axios from "axios";

import Toast from "react-native-toast-message";

import { API_URL } from "@env";

//helper
import * as RootNavigation from "../../../RootNavigation";

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

export const startDelivery =
  (token, longitude, latitude, orderId) => (dispatch) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .put(
        API_URL + `/orders/${orderId}/delivery`,
        { latitude: latitude, longitude: longitude },
        { headers }
      )
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Selamat mengantar pesanan , tetap utamakan keselamatan !",
        });
        RootNavigation.navigate("DeliveryOnProgress", {
          item: res.data,
          latitude: latitude,
          longitude: longitude,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

export const finishDelivery = (data) => (dispatch) => {
  const {
    orderId,
    token,
    name,
    latitude,
    longitude,
    duration,
    distance,
    note,
  } = data;
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  dispatch({ type: ORDER_SAVE_REQUEST });
  axios
    .put(
      API_URL + `/orders/${orderId}/complete`,
      {
        name: name,
        image: API_URL,
        latitude: latitude,
        note: note,
        longitude: longitude,
        duration: duration,
        distance: distance,
      },
      { headers }
    )
    .then((res) => {
      dispatch({ type: ORDER_SAVE_SUCCESS });
      Toast.show({
        type: "success",
        text1: "Paket telah diterima dan data berhasil disimpan !",
      });
      RootNavigation.reset({ routes: [{ name: "Home" }], index: 0 });
    })
    .catch((err) => {
      Toast.show({
        type: "error",
        text1: "Terjadi kesalahan dalam menyimpan data !",
      });
      console.log(err.response);
    });
};

export const failedDelivery = (data) => (dispatch) => {
  const {
    orderId,
    token,
    name,
    latitude,
    longitude,
    duration,
    distance,
    note,
  } = data;
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  dispatch({ type: ORDER_SAVE_REQUEST });
  axios
    .put(
      API_URL + `/orders/${orderId}/failed`,
      {
        name: name,
        image: API_URL,
        latitude: latitude,
        note: note,
        longitude: longitude,
        duration: duration,
        distance: distance,
      },
      { headers }
    )
    .then((res) => {
      dispatch({ type: ORDER_SAVE_FAILURE });
      Toast.show({
        type: "success",
        text1: "Paket ditolak pelanggan , data tersimpan !",
      });
      RootNavigation.reset({ routes: [{ name: "Home" }], index: 0 });
    })
    .catch((err) => {
      Toast.show({
        type: "error",
        text1: "Terjadi kesalahan dalam menyimpan data !",
      });
      console.log(err.response);
    });
};

export const updateLocations =
  ({ token, longitude, latitude, _id }) =>
  (dispatch) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    // dispatch({type:})
    axios
      .post(
        API_URL + "/locations",
        {
          order_id: _id,
          latitude: latitude,
          longitude: longitude,
        },
        { headers }
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
