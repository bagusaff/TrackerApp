import { CHECKING_CONNECTION } from "../constants";
import NetInfo from "@react-native-community/netinfo";

export const checkConnection = () => (dispatch) => {
  NetInfo.addEventListener((state) => {
    dispatch({ type: CHECKING_CONNECTION, payload: state.isConnected });
  });
};
