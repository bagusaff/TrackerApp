import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  Layout,
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

const data = new Array(18).fill({
  title: "Title for Item",
  description: "Description for Item",
});

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const renderItemIcon = (props) => <Icon {...props} name="person" />;
const renderArrowIcon = (props) => <Icon {...props} name="arrow-right" />;

const OrderLists = ({ navigation, route }) => {
  const theme = useTheme();
  const { title, type } = route.params;
  //render local components
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  useEffect(() => {
    switch (type) {
      case 1:
        console.log("1");
        break;
      case 2:
        console.log("2");
        break;
      case 3:
        console.log("3");
        break;
      default:
        break;
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Wrapper */}
      <Layout level="1">
        <TopNavigation
          alignment="center"
          title={title}
          accessoryLeft={renderBackAction}
        />
        <Divider />
      </Layout>
      <List
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderArrowIcon}
            onPress={
              type == 1
                ? () => navigation.push("Delivery")
                : () => navigation.goBack()
            }
          />
        )}
        ItemSeparatorComponent={Divider}
      />
    </SafeAreaView>
  );
};

export default OrderLists;

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
  },
});
