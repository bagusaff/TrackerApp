import {
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_FAILURE,
  ORDER_FETCH_SUCCESS,
} from "../constants";

const initialState = {
  orderList: [],
  loading: false,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: action.payload,
      };
    case ORDER_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default OrderReducer;
