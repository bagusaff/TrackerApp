import React from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DeliveryAnimation = () => {
  return (
    <LottieView
      source={require("../assets/lotties/OnDelivery.json")}
      style={{
        width: wp("50%"),
        height: hp("25%"),
        alignSelf: "center",
        justifyContent: "center",
      }}
      autoPlay
      loop
      speed={3}
    />
  );
};

export default DeliveryAnimation;
