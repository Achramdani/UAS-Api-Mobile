import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import darkTheme from "../../Theme/darkTheme";
import { Wrench, Car, Clipboard, BarChart2 } from "lucide-react-native";

const TeknisiDashboard = ({ navigation }) => {
  const menuItems = [
    {
      title: "Proses Service",
      screen: "ProsesService",
      icon: <Wrench color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Tracking Perbaikan",
      screen: "TrackingPerbaikan",
      icon: <Car color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Manajemen Suku Cadang",
      screen: "ManajemenSukuCadang",
      icon: <Clipboard color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Laporan Service",
      screen: "LaporanService",
      icon: <BarChart2 color={darkTheme.colors.text} size={24} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Teknisi Dashboard</Text>
          <Text style={styles.subtitle}>Kelola Perbaikan Kendaraan</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Service Aktif</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Menunggu Suku Cadang</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemContent}>
                {item.icon}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.primary,
  },
  headerContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: darkTheme.colors.subText,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  statBox: {
    backgroundColor: darkTheme.colors.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
  },
  statNumber: {
    fontSize: 24,
    color: darkTheme.colors.accent,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: darkTheme.colors.subText,
    marginTop: 5,
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: darkTheme.colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuItemText: {
    color: darkTheme.colors.text,
    fontSize: 18,
    marginLeft: 15,
  },
});

export default TeknisiDashboard;
