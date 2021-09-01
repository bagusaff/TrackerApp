import React from "react";
import { StyleSheet } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

const ProfileSetting = (props) => {
  const { style, hint, value } = props;
  const renderHintElement = () => (
    <Text appearance="hint" category="label">
      {hint}
    </Text>
  );
  return (
    <>
      <Layout level="1" style={[styles.container, style]}>
        {hint && renderHintElement()}
        <Text category="label">{value}</Text>
      </Layout>
      <Divider />
    </>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
