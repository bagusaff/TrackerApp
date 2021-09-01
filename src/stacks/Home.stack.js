import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home.screen";
import DeliveryScreen from "../screens/Delivery.screen";
import AddOrderScreen from "../screens/AddOrder.screen";
import FinishDeliveryScreen from "../screens/FinishDelivery.screen";
import NotificationScreen from "../screens/Notification.screen";
import OrderListsScreen from "../screens/OrderLists.screen";
import GeoLocation from "../screens/GeoLocation.screen";
import MapView from "../screens/MapView";

const HomeStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={DeliveryScreen} name="Delivery" />
      <Stack.Screen component={AddOrderScreen} name="AddOrder" />
      <Stack.Screen component={FinishDeliveryScreen} name="FinishDelivery" />
      <Stack.Screen component={NotificationScreen} name="Notification" />
      <Stack.Screen component={OrderListsScreen} name="OrderLists" />
      <Stack.Screen component={GeoLocation} name="GeoLocation" />
      <Stack.Screen component={MapView} name="MapView" />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
