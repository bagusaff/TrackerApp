import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
