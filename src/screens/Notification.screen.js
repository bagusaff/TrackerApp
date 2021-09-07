import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import {
  Layout,
  Text,
  Button,
  Divider,
  Icon,
  useTheme,
  TopNavigation,
  TopNavigationAction,
  List,
  ListItem,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import EmptyAnimation from "../components/EmptyAnimation";

const data = new Array(5).fill({
  title: "Title for Item",
  description: "Description for Item",
});

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const renderItemIcon = (props) => <Icon {...props} name="person" />;

const renderItem = ({ item, index }) => (
  <ListItem
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${index + 1}`}
    accessoryLeft={renderItemIcon}
  />
);

const Notification = ({ navigation }) => {
  const theme = useTheme();
  //render local components
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Wrapper */}
      <Layout level="1">
        <TopNavigation
          alignment="center"
          title="Notifikasi"
          accessoryLeft={renderBackAction}
        />
        <Divider />
      </Layout>
      {data !== null && data.length > 0 ? (
        <List style={styles.listWrapper} data={data} renderItem={renderItem} />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <EmptyAnimation />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    // paddingHorizontal: 20,
    paddingTop: 15,
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  listWrapper: {
    maxHeight: hp("100%"),
    backgroundColor: "white",
  },
});
