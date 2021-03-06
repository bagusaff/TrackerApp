import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  Input,
  Divider,
  Icon,
  useTheme,
  TopNavigation,
  Spinner,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import useState from "react-usestateref";
import { useSelector, useDispatch } from "react-redux";
import { finishDelivery, failedDelivery } from "../state";

const FinishDelivery = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  //Local State
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isDone, setIsDone, isDoneRef] = useState(false);

  //Redux Variable
  const { token } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.order);
  //Local Variable
  const {
    finalLatitude,
    finalLongitude,
    totalTime,
    totalDistance,
    orderId,
    type,
  } = route.params;

  //Local Components
  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="primary" size="small" />
    </View>
  );

  //Local Functions
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
          "Tidak Dapat Kembali",
          "Anda harus mengisi form dan menekan tombol selesai",
          [{ text: "OK", style: "cancel", onPress: () => {} }]
        );
      }),
    [navigation, isDone]
  );

  const submitFinished = () => {
    setIsDone(true);
    const data = {
      orderId: orderId,
      token: token,
      name: name,
      note: note,
      latitude: finalLatitude,
      longitude: finalLongitude,
      duration: totalTime,
      distance: totalDistance,
    };
    dispatch(finishDelivery(data));
  };

  const submitFailed = () => {
    setIsDone(true);
    const data = {
      orderId: orderId,
      token: token,
      name: name,
      note: note,
      latitude: finalLatitude,
      longitude: finalLongitude,
      duration: totalTime,
      distance: totalDistance,
    };
    dispatch(failedDelivery(data));
  };

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (res) => {
      console.log("Response = ", res);

      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log("response", JSON.stringify(res));
        setPhoto(res);
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (res) => {
      console.log("Response = ", res);

      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log("response", JSON.stringify(res));
        setPhoto(res);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Wrapper */}
      <Layout level="1">
        <TopNavigation
          alignment="center"
          title={type === 1 ? "Pengiriman Selesai" : "Pengiriman Ditolak"}
          subtitle={("Order", orderId)}
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
            Catatan Pengiriman {type === 1 ? "Paket Diterima" : "Paket Ditolak"}
          </Text>
          <Text category="s1" style={{ color: theme["color-basic-500"] }}>
            Tambahkan bukti foto pengiriman dan catatan jika perlu
          </Text>
        </Layout>

        {/* Body Content Wrapper */}
        <Layout
          level="1"
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Input
            value={note}
            placeholder="Tambah Catatan"
            style={{ width: "100%", marginVertical: hp("2.5%") }}
            // caption={renderCaption}
            label="Catatan"
            onChangeText={(nextValue) => setNote(nextValue)}
          />
          <Input
            value={name}
            placeholder="Nama Penerima"
            style={{ width: "100%", marginVertical: hp("2.5%") }}
            // caption={renderCaption}
            label="Nama Penerima"
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Text
            category="label"
            style={{ paddingBottom: 5, color: theme["color-basic-600"] }}
          >
            Foto Penerima
          </Text>
          {photo ? (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={imageGalleryLaunch}
              >
                <Image
                  source={{
                    uri: photo.assets[0].uri,
                  }}
                  style={{
                    width: wp("40%"),
                    height: wp("40%"),
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Button
              style={{ width: wp("40%"), height: wp("40%") }}
              appearance="outline"
              status="primary"
              accessoryLeft={<Icon name="plus" />}
              onPress={imageGalleryLaunch}
            />
          )}
          {photo && (
            <Button
              onPress={type === 1 ? submitFinished : submitFailed}
              accessoryLeft={loading ? LoadingIndicator : null}
              disabled={loading}
            >
              {!loading ? `Selesai` : `Menyimpan...`}
            </Button>
          )}
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default FinishDelivery;

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
