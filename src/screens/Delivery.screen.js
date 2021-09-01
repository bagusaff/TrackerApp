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
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const DeliveryScreen = ({ navigation, route }) => {
  const theme = useTheme();
  //render local components
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  //local variable
  const { item } = route.params;
  const {
    receipt_number,
    receipt_name,
    receipt_address,
    receipt_phone,
    weight,
  } = item;
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Wrapper */}
      <Layout level="1">
        <TopNavigation
          alignment="center"
          title={`Order ${receipt_number}`}
          subtitle={receipt_name}
          accessoryLeft={renderBackAction}
        />
      </Layout>
      <Divider />
      {/* Body Title Wrapper */}
      <Layout style={styles.wrapper} level="2">
        <Layout
          style={{
            flexDirection: "column",
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          level="2"
        >
          <Text category="h1" status="primary" style={{ fontSize: wp("7.5%") }}>
            Mulai Mengirim
          </Text>
          <Text category="s1" style={{ color: theme["color-basic-500"] }}>
            Penerima akan menerima pesan jika pesanannya sudah mulai diantar.
          </Text>
        </Layout>

        {/* Body Content Wrapper */}
        <Text
          category="s1"
          style={{ paddingHorizontal: 20, color: theme["color-basic-500"] }}
        >
          Informasi Penerima:
        </Text>
        <Layout
          level="1"
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View style={{ paddingVertical: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              No. Resi :
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              {receipt_number}
            </Text>
          </View>
          <Divider />
          <View style={{ paddingVertical: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              Nama Penerima :
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              {receipt_name}
            </Text>
          </View>
          <Divider />
          <View style={{ paddingVertical: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              Alamat Pengiriman :
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              {receipt_address}
            </Text>
          </View>
          <Divider />
          <View style={{ paddingTop: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              Jumlah Paket :
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              {weight} Buah
            </Text>
          </View>
        </Layout>

        <Text
          category="s1"
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 5,
            color: theme["color-basic-500"],
          }}
        >
          Detail Pengiriman:
        </Text>
        <Layout
          level="1"
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View style={{ paddingVertical: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              Total Waktu :
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              00:00
            </Text>
          </View>
          <Divider />
          <View style={{ paddingTop: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              Jarak Tempuh:
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              0.0 KM
            </Text>
          </View>
        </Layout>

        <Layout
          style={{ paddingHorizontal: 20, paddingTop: 10, width: "100%" }}
          level="2"
        >
          <Button
            size="small"
            onPress={() => navigation.navigate("FinishDelivery")}
          >
            {" "}
            Mulai Mengirim
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default DeliveryScreen;

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
});
