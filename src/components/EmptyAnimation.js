import React from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text } from "@ui-kitten/components";
import { View } from "react-native";
const EmptyAnimation = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <LottieView
        source={require("../assets/lotties/EmptyNotification.json")}
        style={{
          width: wp("50%"),
          height: hp("30%"),
          alignSelf: "center",
          justifyContent: "center",
        }}
        autoPlay
        loop
        speed={1}
      />
      <Text category="p1" appearance="hint">
        Tidak ada pemberitahuan
      </Text>
    </View>
  );
};

export default EmptyAnimation;
