import { CHECKING_CONNECTION } from "../constants";

const initialState = {
  isConnected: false,
};

const ConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKING_CONNECTION:
      return {
        isConnected: action.payload,
      };
    default:
      return state;
  }
};

export default ConnectionReducer;
