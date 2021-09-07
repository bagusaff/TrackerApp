import React, { useCallback, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import Geolocation from "react-native-geolocation-service";
import VIForegroundService from "@voximplant/react-native-foreground-service";
import { getDistance } from "geolib";

//components
import appConfig from "../../app.json";
import { updateLocations } from "../state";
import DeliveryAnimation from "../components/DeliveryAnimation";

const DeliveryOnProgress = ({ navigation, route }) => {
  const dispatch = useDispatch();
  //Redux variable
  const { token } = useSelector((state) => state.user);

  //local variable
  const { item, latitude, longitude } = route.params;
  const { receipt_name, receipt_address, weight, _id } = item;
  const [timer, setTimer, timerRef] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [currentPosition, setCurrentPosition, currentPositionRef] =
    useState(null);
  const [totalDistance, setTotalDistance, totalDistanceRef] = useState(0);
  const [isDone, setIsDone, isDoneRef] = useState(false);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
  const watchId = useRef(null);

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
    async function getUserLocation() {
      await getLocationUpdates();
    }
    getUserLocation();
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  useEffect(() => {
    let start;
    if (!isDone) {
      start = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(start);
    };
  }, [isDone]);
  //Location Tracker Functions
  const getLocationUpdates = async () => {
    if (Platform.OS === "android") {
      await startForegroundService();
    }

    setTracking(true);

    watchId.current = Geolocation.watchPosition(
      (position) => {
        setCurrentPosition(position);
        dispatch(
          updateLocations({
            token,
            longitude: currentPositionRef.current.coords.longitude,
            latitude: currentPositionRef.current.coords.latitude,
            _id,
          })
        );
        setTotalDistance(
          getDistance(
            {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            },
            {
              latitude: latitude,
              longitude: longitude,
            }
          )
        );
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
        interval: 10000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
        useSignificantChanges: false,
      }
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
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
          onPress: orderFailed,
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
    navigation.push("FinishDelivery", {
      orderId: _id,
      finalLatitude: currentPositionRef.current.coords.latitude,
      finalLongitude: currentPositionRef.current.coords.longitude,
      totalTime: timerRef.current,
      totalDistance: totalDistanceRef.current,
      type: 1,
    });
  };
  const orderFailed = () => {
    setIsDone(true);
    removeLocationUpdates();
    navigation.push("FinishDelivery", {
      orderId: _id,
      finalLatitude: currentPositionRef.current.coords.latitude,
      finalLongitude: currentPositionRef.current.coords.longitude,
      totalTime: timerRef.current,
      totalDistance: totalDistanceRef.current,
      type: 2,
    });
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
              <Text style={styles.detail}>
                {getHours} : {getMinutes}
              </Text>
            </View>

            <View style={[styles.detailBox, styles.half]}>
              <Text style={styles.valueTitle}>Total Jarak Ditempuh</Text>
              <Text style={styles.detail}>
                {totalDistance ? totalDistance / 1000 : 0} KM
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
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <DeliveryAnimation />
        </View>
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
