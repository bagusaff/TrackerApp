import React, { useState } from "react";
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

//component import
import WavyBackground from "../components/WavyBackground";

const ResetPasswordScreen = () => {
  const theme = useTheme();

  //UseState Hooks
  const [email, setEmail] = useState("");

  //Local Components
  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.wrapper}>
        {/* Header Wrapper */}
        <Layout style={{ flexDirection: "column", paddingBottom: 20 }}>
          <Text category="h1" status="primary" style={{ fontSize: wp("7.5%") }}>
            Lupa Kata Sandi
          </Text>
          <Text category="s1" style={{ color: theme["color-basic-500"] }}>
            Masukkan alamat email anda
          </Text>
        </Layout>

        {/* Input Wrapper */}
        <Layout>
          <Input
            value={email}
            placeholder="Email"
            style={{ width: "100%", marginVertical: hp("2.5%") }}
            accessoryRight={<Icon name={"email"} />}
            onChangeText={(nextValue) => setEmail(nextValue)}
            keyboardType="email-address"
          />
          <Button size="medium" accessoryLeft={LoadingIndicator}>
            RESET PASSWORD
          </Button>
        </Layout>
        <WavyBackground
          customStyles={styles.svgWaves}
          customHeight={hp("30%")}
          customBottom={0}
          customBgColor="#3366FF"
          customWavePattern="M0 849L15 849.2C30 849.3 60 849.7 90 846.2C120 842.7 150 835.3 180 828C210 820.7 240 813.3 270 804.2C300 795 330 784 360 783.5C390 783 420 793 450 807C480 821 510 839 525 848L540 857L540 961L525 961C510 961 480 961 450 961C420 961 390 961 360 961C330 961 300 961 270 961C240 961 210 961 180 961C150 961 120 961 90 961C60 961 30 961 15 961L0 961Z"
        />
      </Layout>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

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
  svgWaves: {
    position: "absolute",
    bottom: 0,
  },
});
