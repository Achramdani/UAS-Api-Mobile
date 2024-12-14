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

const AdminDashboard = ({ navigation }) => {
  const menuItems = [
    { title: "Kontrol Pengguna", screen: "UserManagement" },
    { title: "Pengaturan Sistem", screen: "SystemSettings" },
    { title: "Laporan", screen: "Reports" },
    { title: "Keluar", screen: "Login" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Admin Dashboard</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
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
  title: {
    fontSize: 24,
    color: darkTheme.colors.text,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: darkTheme.colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  menuItemText: {
    color: darkTheme.colors.text,
    fontSize: 18,
  },
});

export default AdminDashboard;
