import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import {
  Layout,
  Text,
  Button,
  Divider,
  Icon,
  useTheme,
  List,
  ListItem,
} from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//components
import HeaderAvatarProfile from "../components/HeaderAvatarProfile";
import ReportCard from "../components/ReportCard";

const ReportScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderAvatarProfile onPress={() => navigation.push("Notification")} />
      <Divider />
      <Layout style={styles.wrapper} level="2">
        <Layout style={{ paddingBottom: 20 }} level="2">
          <Text category="h1" status="primary" style={{ fontSize: wp("7.5%") }}>
            Laporan
          </Text>
        </Layout>
        <Text style={styles.labelText}>Semua Order</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </ScrollView>
        <Text style={styles.labelText}>Hari Ini</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </ScrollView>
        <Text style={styles.labelText}>Minggu Ini</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </ScrollView>
        <Text style={styles.labelText}>Bulan Ini</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default ReportScreen;

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
  labelText: {
    marginBottom: 5,
  },
});
