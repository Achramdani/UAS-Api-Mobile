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
import { CreditCard, QrCode, Printer, Receipt } from "lucide-react-native";

const KasirDashboard = ({ navigation }) => {
  const menuItems = [
    {
      title: "Transaksi Baru",
      screen: "TransaksiBaru",
      icon: <CreditCard color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Generate QR Code",
      screen: "GenerateQR",
      icon: <QrCode color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Cetak Kuitansi",
      screen: "CetakKuitansi",
      icon: <Printer color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Riwayat Transaksi",
      screen: "RiwayatTransaksi",
      icon: <Receipt color={darkTheme.colors.text} size={24} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Kasir Dashboard</Text>
          <Text style={styles.subtitle}>Selamat Bekerja</Text>
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

export default KasirDashboard;
