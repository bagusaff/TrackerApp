import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Layout,
  Text,
  Avatar,
  Button,
  Divider,
  Icon,
  useTheme,
  TopNavigation,
  Input,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProfileSetting from "../components/ProfileSetting";

const ProfileScreen = () => {
  const theme = useTheme();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Local Functions
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  //Local Components
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Wrapper */}

      {/* Body Wrapper */}
      <ScrollView>
        <Layout style={styles.wrapper} level="2">
          <Layout style="1" style={styles.headerWrapper}>
            <Avatar
              style={styles.avatar}
              source={require("../assets/images/Avatar.png")}
            />
            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Text style={{ marginBottom: 5 }}>Name</Text>
              <Divider style={{ marginBottom: 5 }} />
              <Text style={{ marginBottom: 5 }}>Name</Text>
              <Divider />
            </View>
          </Layout>
          <ProfileSetting style={styles.setting} hint="Nama" value="John Doe" />
          <ProfileSetting
            style={styles.setting}
            hint="Jenis Kelamin"
            value="Laki-laki"
          />
          <ProfileSetting style={styles.setting} hint="Usia" value="29" />
          <ProfileSetting style={styles.setting} hint="Tinggi" value="180 CM" />
          <ProfileSetting style={styles.setting} hint="Berat" value="75 KG" />
          <Layout style={styles.passwordWrapper} level="1">
            <Text
              category="label"
              appearance="hint"
              style={{ paddingBottom: 5 }}
            >
              Ganti Kata Sandi
            </Text>
            <Input
              value={oldPassword}
              placeholder="Password Lama"
              style={{ width: "100%", marginBottom: hp("2.5%") }}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) => setOldPassword(nextValue)}
            />
            <Input
              value={newPassword}
              placeholder="Password Baru"
              style={{ width: "100%" }}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) => setNewPassword(nextValue)}
            />
            <Button style={{ marginTop: 15 }} size="small">
              {" "}
              Ganti Kata Sandi
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: wp("15%"),
    width: wp("15%"),
    marginRight: wp("5%"),
    resizeMode: "cover",
  },
  wrapper: {
    // paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  setting: {
    padding: 16,
  },
  passwordWrapper: {
    width: "100%",
    marginTop: 15,
    padding: 15,
  },
  headerWrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    marginBottom: 15,
  },
});
