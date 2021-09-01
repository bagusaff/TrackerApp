import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

//redux
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { store, persistor } from "./src/state/store";
import { PersistGate } from "redux-persist/es/integration/react";

//layout
import BottomTab from "./src/navigation/BottomTab";
import AuthStack from "./src/stacks/Auth.stack";

//Toast
import Toast from "react-native-toast-message";

//Redux Functions
import { checkConnection, logoutHandle } from "./src/state";

//ui
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { default as theme } from "./src/custom-theme.json";
import { default as mapping } from "./src/mapping.json";

const AppWrapper = () => {
  const dispatch = useDispatch();
  //redux state
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isConnected } = useSelector((state) => state.connection);

  //check connection
  useEffect(() => {
    const unsubscribe = dispatch(checkConnection());
    console.log("Device Connection is now : ", isConnected);
    console.log("Logged In : ", isLoggedIn);
  }, [isConnected, isLoggedIn]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <NavigationContainer>
          {isLoggedIn ? <BottomTab /> : <AuthStack />}
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}
