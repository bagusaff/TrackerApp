import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import {
  Text,
  Layout,
  Divider,
  TopNavigation,
  Button,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useState from "react-usestateref";
import Geolocation from "react-native-geolocation-service";
import VIForegroundService from "@voximplant/react-native-foreground-service";
import Timer from "react-compound-timer";

//components
import appConfig from "../../app.json";

const DeliveryOnProgress = ({ navigation, route }) => {
  //local variable
  const { item } = route.params;
  const { receipt_name, receipt_address, weight, _id } = item;
  const [time, setTime] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [startPosition, setStartPosition, startPositionRef] = useState(null);
  const [currentPosition, setCurrentPosition, currentPositionRef] =
    useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isDone, setIsDone, isDoneRef] = useState(false);
  //Useffect Functions
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (isDoneRef.current) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Tidak Dapat Meninggalkan Layar",
          "Anda masih bisa menyembunyikan app ini dengan menekan tombol home",
          [{ text: "OK", style: "cancel", onPress: () => {} }]
        );
      }),
    [navigation, isDone]
  );

  useEffect(() => {
    getLocation();
    getLocationUpdates();
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  //Location Tracker Functions
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
        setStartPosition(position);
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
        distanceFilter: 100,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      }
    );
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === "android") {
      await startForegroundService();
    }

    setTracking(true);

    currentPositionRef.current = Geolocation.watchPosition(
      (position) => {
        setCurrentPosition(position);
      },
      (error) => {
        console.log(error);
      },
      {
        accuracy: {
          android: "high",
          ios: "best",
        },
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
        useSignificantChanges: false,
      }
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (currentPositionRef.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(currentPositionRef.current);
      currentPositionRef.current = null;
      setTracking(false);
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: "locationChannel",
        name: "Courier Tracking Location",
        description: "Sedang memantau posisi anda",
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: "locationChannel",
      id: 420,
      title: appConfig.name,
      text: "Memantau posisi terbaru ",
      text: "Waktu Berlalu : ",
      text: "Jarak Ditempuh : ",
      icon: "ic_launcher",
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err) => err);
  }, []);

  const showReturnAlert = () => {
    Alert.alert(
      "Apakah Paket Ditolak ?",
      "Anda tidak bisa membatalkan perintah ini dan harus mengembalikan paket.",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "OK",
          //   onPress: () => navigation.navigate("DeliveryOnProgress"),
        },
      ]
    );
  };
  const showDeliveredAlert = () => {
    Alert.alert(
      "Apakah Paket Diterima ?",
      "Apakah paket selesai diantar dan pelanggan menerimanya ?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: orderFinished,
        },
      ]
    );
  };
  const orderFinished = () => {
    setIsDone(true);
    removeLocationUpdates();
    navigation.navigate("FinishDelivery");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Wrapper */}
      <Layout level="1">
        <TopNavigation alignment="center" title="Sedang Mengirim Paket" />
        <Divider />
      </Layout>

      <Layout style={styles.wrapper}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text category="h1" style={{ textAlign: "center" }}>
            {receipt_address}
          </Text>
          <Text category="p1">{receipt_name}</Text>
          <Text category="p2">Jumlah Paket : {weight}</Text>
        </View>
        <Divider style={{ width: "100%", marginTop: 5 }} />

        <View style={{ alignItems: "flex-start" }}>
          <View style={styles.row}>
            <View style={[styles.detailBox, styles.half]}>
              <Text style={styles.valueTitle}>Waktu Berlalu</Text>
              <Timer startImmediately={true} lastUnit="m">
                <Text style={styles.detail}>
                  <Timer.Minutes />
                </Text>
                <Text style={styles.detail}>
                  <Timer.Seconds />
                </Text>
              </Timer>
              <Text style={styles.detail}>00:45</Text>
            </View>

            <View style={[styles.detailBox, styles.half]}>
              <Text style={styles.valueTitle}>Total Jarak Ditempuh</Text>
              <Text style={styles.detail}>
                {startPosition?.coords?.latitude}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.detailBox, styles.half]}>
              <Text style={styles.valueTitle}>Kecepatan</Text>
              <Text style={styles.detail}>
                {Math.trunc(currentPosition?.coords?.speed * 3.6)} Km / jam
              </Text>
            </View>

            <View style={[styles.detailBox, styles.half]}>
              <Text style={styles.valueTitle}>Tanggal</Text>
              <Text style={styles.detail}>
                {currentPosition?.coords?.latitude}
              </Text>
            </View>
          </View>
        </View>
        <Divider style={{ width: "100%", marginTop: 5 }} />

        <Layout style={styles.row}>
          <Button status="danger" onPress={showReturnAlert}>
            Paket Ditolak
          </Button>
          <Button status="primary" onPress={showDeliveredAlert}>
            Paket Terkirim
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default DeliveryOnProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  listWrapper: {
    maxHeight: hp("100%"),
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 5,
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  detailBox: {
    padding: 15,
    justifyContent: "center",
  },
  valueTitle: {
    fontFamily: "Futura",
    fontSize: 12,
  },
  detail: {
    fontSize: 15,
    fontWeight: "bold",
  },
  half: {
    width: "50%",
  },
});
