import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Filter, ChevronRight, RefreshCw } from "lucide-react-native";
import darkTheme from "../../Theme/darkTheme";
import { getTransaksi } from "../../Services/auth";

// Fungsi untuk format tanggal
const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Warna status
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "#4CAF50"; // Hijau
    case 0:
      return "#FFC107"; // Kuning
    default:
      return darkTheme.colors.subText;
  }
};

const ListTransaksi = ({ navigation }) => {
  const [transaksi, setTransaksi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);

  // Status filter
  const STATUS_OPTIONS = [
    { label: "Semua", value: "2" },
    { label: "Belum Bayar", value: "0" },
    { label: "Sudah Bayar", value: "1" },
  ];

  useEffect(() => {
    fetchTransaksi();
  }, [filter]);

  const fetchTransaksi = async () => {
    try {
      setLoading(true);
      const response = await getTransaksi(filter);
      setTransaksi(response);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil transaksi:", error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTransaksi().then(() => setRefreshing(false));
  }, [filter]);

  const renderTransaksiItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transaksiItem}
      onPress={() => navigation.navigate("DetailTransaksi", { id: item.id })}
    >
      <View style={styles.transaksiContent}>
        <View style={styles.transaksiHeader}>
          <Text style={styles.kodeTransaksi}>{item.kode}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === 1 ? "Sudah Bayar" : "Belum Bayar"}
            </Text>
          </View>
        </View>
        <Text style={styles.pelangganText}>
          {item.perbaikan?.user?.name || "Nama Tidak Tersedia"}
        </Text>
        <Text style={styles.tanggalText}>{formatTanggal(item.created_at)}</Text>
      </View>
      <ChevronRight color={darkTheme.colors.subText} size={24} />
    </TouchableOpacity>
  );

  const FilterBar = () => (
    <View style={styles.filterContainer}>
      {STATUS_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.label}
          style={[
            styles.filterButton,
            filter === option.value && styles.activeFilterButton,
          ]}
          onPress={() => setFilter(option.value)}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === option.value && styles.activeFilterButtonText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daftar Transaksi</Text>
        <TouchableOpacity onPress={onRefresh}>
          <RefreshCw color={darkTheme.colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <FilterBar />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={darkTheme.colors.accent} />
        </View>
      ) : (
        <FlatList
          data={transaksi}
          renderItem={renderTransaksiItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tidak ada transaksi</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[darkTheme.colors.accent]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: darkTheme.colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: darkTheme.colors.accent,
  },
  filterButtonText: {
    color: darkTheme.colors.subText,
  },
  activeFilterButtonText: {
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  transaksiItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: darkTheme.colors.secondary,
    padding: 16,
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  transaksiContent: {
    flex: 1,
    marginRight: 10,
  },
  transaksiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kodeTransaksi: {
    fontSize: 16,
    fontWeight: "bold",
    color: darkTheme.colors.text,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  pelangganText: {
    color: darkTheme.colors.subText,
    marginTop: 5,
  },
  tanggalText: {
    color: darkTheme.colors.subText,
    fontSize: 12,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: darkTheme.colors.subText,
    fontSize: 16,
  },
});

export default ListTransaksi;
