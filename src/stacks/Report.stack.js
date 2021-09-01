import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportScreen from "../screens/Report.screen";
import NotificationScreen from "../screens/Notification.screen";
const ReportStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Report"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={ReportScreen} name="Report" />
      <Stack.Screen component={NotificationScreen} name="Notification" />
    </Stack.Navigator>
  );
};

export default ReportStackScreen;
