import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile.screen";
const ProfileStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={ProfileScreen} name="Profile" />
    </Stack.Navigator>
  );
};

export default ProfileStackScreen;
