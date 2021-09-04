import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
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
import { useSelector, useDispatch } from "react-redux";
import useState from "react-usestateref";
import Geolocation from "react-native-geolocation-service";

//components import
import { startDelivery } from "../state";

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const DeliveryScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  //render local components
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  //Redux variable
  const { token } = useSelector((state) => state.user);

  //local variable
  const { item } = route.params;
  const {
    receipt_number,
    receipt_name,
    receipt_address,
    weight,
    receipt_phone,
    _id,
  } = item;
  const [latitude, setLatitude, latitudeRef] = useState(null);
  const [longitude, setLongitude, longitudeRef] = useState(null);

  //useEffect
  useEffect(() => {
    getLocation();
  }, []);

  //local functions
  const showConfirmDeliveryAlert = () => {
    Alert.alert(
      "Mulai Mengirim Paket ?",
      "Anda tidak bisa membatalkan perintah ini dan harus menyelesaikan pengiriman.",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            dispatch(startDelivery(token, longitude, latitude, _id)),
        },
      ]
    );
  };
  //Trackers Function
  const hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setStartPosition(null);
        console.log(error);
      },
      {
        accuracy: {
          android: "high",
          ios: "best",
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      }
    );
  };
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
            Penerima akan menerima pesan jika paketnya sudah mulai diantar.
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
          <View style={{ paddingVertical: 5 }}>
            <Text category="s1" style={{ color: theme["color-basic-700"] }}>
              Nomor Telepon Penerima :
            </Text>
            <Text category="p1" style={{ color: theme["color-basic-700"] }}>
              {receipt_phone}
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

        <Layout
          style={{ paddingHorizontal: 20, paddingTop: 10, width: "100%" }}
          level="2"
        >
          <Button size="small" onPress={showConfirmDeliveryAlert}>
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
