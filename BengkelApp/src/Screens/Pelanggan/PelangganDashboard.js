import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import darkTheme from "../../Theme/darkTheme";
import {
  CalendarCheck,
  CreditCard,
  Wrench,
  History,
} from "lucide-react-native";

const PelangganDashboard = ({ navigation }) => {
  const menuItems = [
    {
      title: "Booking Service",
      screen: "BookingService",
      icon: <CalendarCheck color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Pembayaran",
      screen: "Pembayaran",
      icon: <CreditCard color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Riwayat Service",
      screen: "RiwayatService",
      icon: <History color={darkTheme.colors.text} size={24} />,
    },
    {
      title: "Informasi Bengkel",
      screen: "InformasiBengkel",
      icon: <Wrench color={darkTheme.colors.text} size={24} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff",
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.title}>John Doe</Text>
              <Text style={styles.subtitle}>Pelanggan Bengkel</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Service Aktif</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Rp 500K</Text>
            <Text style={styles.statLabel}>Total Biaya</Text>
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
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: darkTheme.colors.subText,
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

export default PelangganDashboard;
