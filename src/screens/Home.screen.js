import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import {
  Layout,
  Text,
  Button,
  Divider,
  Icon,
  useTheme,
  List,
  ListItem,
  Spinner,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

//components
import { fetchOrders } from "../state";
import HeaderAvatarProfile from "../components/HeaderAvatarProfile";

// Icons
const AddIcon = (props) => (
  <Icon {...props} name="plus-circle" width={25} height={25} />
);
const renderItemIcon = (props) => <Icon {...props} name="gift" />;
const renderArrowIcon = (props) => <Icon {...props} name="arrow-right" />;

//Dummy Data
// const data = new Array(3).fill({
//   title: "Title for Item",
//   description: "Description for Item",
// });

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  //Redux Variable
  const { token } = useSelector((state) => state.user);
  const { orderList, loading } = useSelector((state) => state.order);
  //hooks

  //Local Components
  const RenderLoading = () => (
    <View style={styles.loading}>
      <Spinner />
    </View>
  );

  //Local Functions
  useEffect(() => {
    dispatch(fetchOrders(token));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAvatarProfile onPress={() => navigation.push("Notification")} />
      <Divider />
      <Layout style={styles.wrapper} level="2">
        {/* Header Wrapper */}
        <Layout
          level="2"
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <Text category="h1" status="primary" style={{ fontSize: wp("7.5%") }}>
            Order
          </Text>
          <Button
            accessoryLeft={AddIcon}
            size="small"
            style={{ borderRadius: 10 }}
            onPress={() => navigation.push("GeoLocation")}
          >
            <Text>SCAN BARCODE</Text>
          </Button>
        </Layout>

        {/* Body Wrapper */}
        <View style={styles.bodyWrapper}>
          <Text
            category="s1"
            style={{
              paddingBottom: 5,
              fontSize: wp("4%"),
              color: theme["color-basic-500"],
            }}
          >
            Antrian
          </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() =>
              navigation.push("OrderLists", {
                title: "Antrian Order",
                type: 1,
              })
            }
          >
            Lihat Semua
          </Text>
        </View>
        {loading ? (
          <RenderLoading />
        ) : (
          <List
            style={styles.listWrapper}
            data={orderList
              .filter((obj) => obj.status === "active")
              .slice(0, 3)}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.receipt_number}`}
                description={`${item.receipt_address}`}
                accessoryLeft={renderItemIcon}
                accessoryRight={renderArrowIcon}
                onPress={() => navigation.push("Delivery", { item })}
              />
            )}
            ItemSeparatorComponent={Divider}
          />
        )}
        <View style={styles.bodyWrapper}>
          <Text
            category="s1"
            style={{
              paddingBottom: 5,
              fontSize: wp("4%"),
              color: theme["color-basic-500"],
            }}
          >
            Terkirim
          </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() =>
              navigation.push("OrderLists", {
                title: "Order Terkirim",
                type: 2,
              })
            }
          >
            Lihat Semua
          </Text>
        </View>
        {loading ? (
          <RenderLoading />
        ) : (
          <List
            style={styles.listWrapper}
            data={orderList
              .filter((obj) => obj.status === "delivery")
              .slice(0, 3)}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.receipt_number}`}
                description={`${item.receipt_address}`}
                accessoryLeft={renderItemIcon}
                accessoryRight={renderArrowIcon}
                onPress={() => navigation.push("Delivery", { item })}
              />
            )}
            ItemSeparatorComponent={Divider}
          />
        )}
        <View style={styles.bodyWrapper}>
          <Text
            category="s1"
            style={{
              paddingBottom: 5,
              fontSize: wp("4%"),
              color: theme["color-basic-500"],
            }}
          >
            Return
          </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() =>
              navigation.push("OrderLists", {
                title: "Order Return",
                type: 3,
              })
            }
          >
            Lihat Semua
          </Text>
        </View>
        {loading ? (
          <RenderLoading />
        ) : (
          <List
            style={styles.listWrapper}
            data={orderList
              .filter((obj) => obj.status === "return")
              .slice(0, 3)}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.receipt_number}`}
                description={`${item.receipt_address}`}
                accessoryLeft={renderItemIcon}
                accessoryRight={renderArrowIcon}
                onPress={() => navigation.push("Delivery", { item })}
              />
            )}
            ItemSeparatorComponent={Divider}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    flex: 1,
    width: "100%",
  },
  bodyWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
