import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  useTheme,
  Input,
  Icon,
  Spinner,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

//component import
import WavyBackground from "../components/WavyBackground";
import Courier from "../assets/icons/courier.svg";
import { loginHandle } from "../state";

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  //Redux Variable
  const { loading } = useSelector((state) => state.user);

  //Hooks
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Local Functions
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const onLoginPressed = () => {
    if (email === "") {
      Toast.show({
        type: "error",
        text1: "Email tidak boleh kosong!",
      });
    } else if (password === "") {
      Toast.show({
        type: "error",
        text1: "Password tidak boleh kosong!",
      });
    } else {
      dispatch(loginHandle(email, password));
    }
  };

  //Local Components
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="primary" size="small" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.wrapper}>
        {/* Header Wrapper */}
        <Layout style={{ flexDirection: "column", paddingBottom: 20 }}>
          <Text category="h1" status="primary" style={{ fontSize: wp("7.5%") }}>
            Kurir Tracker
          </Text>
          <Text category="s1" style={{ color: theme["color-basic-500"] }}>
            Silahkan masuk untuk melanjutkan
          </Text>
        </Layout>

        {/* Input Form Wrapper */}
        <Layout>
          <Input
            value={email}
            placeholder="E-mail"
            style={{ width: "100%", marginVertical: hp("2.5%") }}
            // caption={renderCaption}
            accessoryRight={<Icon name={"person"} />}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Input
            value={password}
            placeholder="Password"
            style={{ width: "100%", marginBottom: hp("1.25%") }}
            // caption={renderCaption}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
          <Text
            category="label"
            style={{
              fontSize: wp("3%"),
              marginBottom: hp("1.25%"),
              textAlign: "right",
              color: theme["color-basic-500"],
            }}
            onPress={() => navigation.push("ResetPassword")}
          >
            Lupa kata sandi?
          </Text>
          <Button
            size="medium"
            accessoryLeft={loading ? LoadingIndicator : null}
            onPress={onLoginPressed}
            disabled={loading}
          >
            {!loading && `LOGIN`}
          </Button>
        </Layout>
        {/* SVG Background */}
        <Courier
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 1,
          }}
        />
        <WavyBackground
          customStyles={styles.svgWaves}
          customHeight={hp("30%")}
          customBottom={-hp("2%")}
          customBgColor="#3366FF"
          customWavePattern="M0 773L22.5 785.2C45 797.3 90 821.7 135 806C180 790.3 225 734.7 270 709.3C315 684 360 689 405 707.3C450 725.7 495 757.3 517.5 773.2L540 789L540 961L517.5 961C495 961 450 961 405 961C360 961 315 961 270 961C225 961 180 961 135 961C90 961 45 961 22.5 961L0 961Z"
        />
      </Layout>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "20%",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  svgWaves: {
    position: "absolute",
    bottom: 0,
  },
});
