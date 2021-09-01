import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

//reducer list
import UserReducer from "./UserReducer";
import ConnectionReducer from "./ConnectionReducer";
import OrderReducer from "./OrderReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const reducers = combineReducers({
  user: UserReducer,
  connection: ConnectionReducer,
  order: OrderReducer,
});

export default persistReducer(persistConfig, reducers);
