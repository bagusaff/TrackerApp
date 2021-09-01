import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Icon, useTheme } from "@ui-kitten/components";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const ReportCard = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme["color-basic-400"] }]}>
      <Text appearance="hint" category="p2" status="">
        Jumlah Pengiriman
      </Text>
      <Icon style={styles.icon} fill="#3366ff" name="star" />
      <Text category="p1">25</Text>
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: {
    height: wp("25%"),
    width: wp("25%"),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    marginRight: wp("5%"),
  },
  icon: {
    height: wp("10%"),
    width: wp("10%"),
  },
});
