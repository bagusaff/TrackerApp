import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  TopNavigation,
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
  Avatar,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";

//Components
import { logoutHandle } from "../state";

//Icon Components
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;
const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const HeaderAvatarProfile = ({ onPress }) => {
  const dispatch = useDispatch();

  //Redux Variable
  const { userData } = useSelector((state) => state.user);
  //hooks
  const [menuVisible, setMenuVisible] = useState(false);

  //Local Functions
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onLogoutButtonPressed = () => {
    dispatch(logoutHandle());
  };

  //Local Component Render
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = () => (
    <>
      <TopNavigationAction icon={BellIcon} onPress={onPress} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem
          accessoryLeft={LogoutIcon}
          onPress={onLogoutButtonPressed}
          title="Logout"
        />
      </OverflowMenu>
    </>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require("../assets/images/Avatar.png")}
      />
      <Text {...props}>{userData.name}</Text>
    </View>
  );
  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
};

export default HeaderAvatarProfile;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
});
