import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Layout,
  Text,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
} from "@ui-kitten/components";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const data = new Array(8).fill({
  title: "Title for Item",
  description: "Description for Item",
});

const OrderList = ({ navigation }) => {
  const renderItemIcon = (props) => <Icon {...props} name="gift" />;
  const renderArrowIcon = (props) => <Icon {...props} name="arrow-right" />;

  const renderItem = ({ item, index, navigation }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderArrowIcon}
    />
  );

  return (
    <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    maxHeight: hp("25%"),
    flex: 1,
    width: "100%",
  },
});
