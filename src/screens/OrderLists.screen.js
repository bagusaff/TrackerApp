import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  Text,
  Layout,
  Divider,
  Icon,
  useTheme,
  TopNavigation,
  TopNavigationAction,
  List,
  ListItem,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const renderItemIcon = (props) => <Icon {...props} name="person" />;
const renderArrowIcon = (props) => <Icon {...props} name="arrow-right" />;

const OrderLists = ({ navigation, route }) => {
  const theme = useTheme();
  const { title, type } = route.params;

  //Redux variable
  const { orderList, loading } = useSelector((state) => state.order);

  //Hooks variable
  const [data, setData] = useState([]);

  //render local components
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  useEffect(() => {
    switch (type) {
      case 1:
        setData(orderList.filter((obj) => obj.status === "active"));
        break;
      case 2:
        setData(orderList.filter((obj) => obj.status === "complete"));
        break;
      case 3:
        setData(orderList.filter((obj) => obj.status === "return"));
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
      {data.length === 0 ? (
        <Text>Belum ada transaksi</Text>
      ) : (
        <List
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.receipt_number}`}
              description={`${item.receipt_address}`}
              accessoryLeft={renderItemIcon}
              accessoryRight={renderArrowIcon}
              onPress={
                type == 1
                  ? () => navigation.push("Delivery", { item })
                  : () => navigation.goBack()
              }
            />
          )}
          ItemSeparatorComponent={Divider}
        />
      )}
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
