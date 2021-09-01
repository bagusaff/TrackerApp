import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@ui-kitten/components";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from "@ui-kitten/components";

import HomeStack from "../stacks/Home.stack";
import ProfileStack from "../stacks/Profile.stack";
import ReportStack from "../stacks/Report.stack";

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Beranda"
      icon={<Icon name={"home"} animation="zoom" />}
    />
    <BottomNavigationTab
      title="Laporan"
      icon={<Icon name={"file-text"} animation="zoom" />}
    />
    <BottomNavigationTab
      title="Profil"
      icon={<Icon name={"person"} animation="zoom" />}
    />
  </BottomNavigation>
);

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Report" component={ReportStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTab;
