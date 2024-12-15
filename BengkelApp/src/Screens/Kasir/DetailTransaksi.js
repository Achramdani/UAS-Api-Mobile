import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import { ArrowLeft, Edit, Trash2, Copy, FileText } from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";
import darkTheme from "../../Theme/darkTheme";
import { getTransaksiDetail, deleteTransaksi } from "../../Services/auth";

const { width } = Dimensions.get("window");

const DetailTransaksi = ({ route, navigation }) => {
  const { id } = route.params;
  const [transaksi, setTransaksi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  useEffect(() => {
    fetchTransaksiDetail();
  }, [id]);

  const fetchTransaksiDetail = async () => {
    try {
      const response = await getTransaksiDetail(id);
      console.log(response.part_perbaikans);
      setTransaksi(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Gagal mengambil detail transaksi");
    }
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRupiah = (nominal) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(nominal);
  };

  const handleHapusTransaksi = () => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus transaksi ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaksi(id);
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Gagal menghapus transaksi");
            }
          },
        },
      ]
    );
  };

  const QRCodeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={qrCodeVisible}
      onRequestClose={() => setQrCodeVisible(false)}
    >
      <View style={styles.qrCodeModalContainer}>
        <View style={styles.qrCodeModalContent}>
          <Text style={styles.qrCodeTitle}>Kode Pembayaran</Text>
          <View style={styles.qrCodeBox}>
            <QRCode
              value={transaksi?.kode || "TIDAK ADA KODE"}
              size={width * 0.6}
              color={darkTheme.colors.text}
              backgroundColor={darkTheme.colors.primary}
            />
          </View>
          <Text style={styles.qrCodeSubtitle}>{transaksi?.kode}</Text>

          <View style={styles.qrCodeActions}>
            <TouchableOpacity
              style={styles.qrCodeCloseButton}
              onPress={() => setQrCodeVisible(false)}
            >
              <Text style={styles.qrCodeCloseButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const copyToClipboard = () => {
    // Implementasi copy ke clipboard
  };

  const cetakTransaksi = () => {
    // Implementasi cetak/export transaksi
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={darkTheme.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Transaksi</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={styles.headerActionButton}
          >
            <Copy color={darkTheme.colors.text} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={cetakTransaksi}
            style={styles.headerActionButton}
          >
            <FileText color={darkTheme.colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Informasi Transaksi Utama */}
        <View style={styles.transaksiHeader}>
          <Text style={styles.kodeTransaksi}>{transaksi.kode}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {transaksi.status === 0 ? "Belum Bayar" : "Sudah Bayar"}
            </Text>
          </View>
        </View>

        {/* Detail Transaksi */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Informasi Transaksi</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nominal</Text>
            <Text style={styles.detailValue}>
              {formatRupiah(transaksi.nominal)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tanggal Dibuat</Text>
            <Text style={styles.detailValue}>
              {formatTanggal(transaksi.created_at)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dibuat Oleh</Text>
            <Text style={styles.detailValue}>{transaksi.created_by?.name}</Text>
          </View>
        </View>

        {/* Informasi Perbaikan */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Informasi Perbaikan</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kode Perbaikan</Text>
            <Text style={styles.detailValue}>{transaksi.perbaikan?.kode}</Text>
          </View>
        </View>
        {/* Detail Kerusakan Perbaikan */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Detail Perbaikan</Text>

          {/* Informasi Pelanggan */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nama Pelanggan</Text>
            <Text style={styles.detailValue}>
              {transaksi.perbaikan?.user?.name}
            </Text>
          </View>

          {/* Daftar Kerusakan */}
          <Text style={[styles.sectionSubTitle, { marginTop: 10 }]}>
            Daftar Kerusakan
          </Text>
          {transaksi.perbaikan?.part_perbaikans?.map((part, index) => (
            <View
              key={part.id}
              style={[
                styles.kerusakanItem,
                index !== transaksi.perbaikan.part_perbaikans.length - 1 &&
                  styles.kerusakanItemBorder,
              ]}
            >
              <View style={styles.kerusakanHeader}>
                <Text style={styles.kerusakanTitle}>Kerusakan {index + 1}</Text>
                <View
                  style={[
                    styles.statusBadgeSmall,
                    {
                      backgroundColor:
                        part.status === 0
                          ? "#FFC107" // Kuning untuk proses
                          : "#4CAF50", // Hijau untuk selesai
                    },
                  ]}
                >
                  <Text style={styles.statusTextSmall}>
                    {part.status === 0 ? "Proses" : "Selesai"}
                  </Text>
                </View>
              </View>
              <View style={styles.kerusakanDetail}>
                <Text style={styles.detailLabel}>Deskripsi</Text>
                <Text style={styles.detailValue}>{part.deskripsi}</Text>
              </View>
              <View style={styles.kerusakanDetail}>
                <Text style={styles.detailLabel}>Kerusakan</Text>
                <Text style={styles.detailValue}>{part.kerusakan}</Text>
              </View>
              <View style={styles.kerusakanDetail}>
                <Text style={styles.detailLabel}>Solusi</Text>
                <Text style={styles.detailValue}>{part.solusi}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Tombol QR Code */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.qrCodeButton}
          onPress={() => setQrCodeVisible(true)}
        >
          <QRCode color={darkTheme.colors.text} size={20} />
          <Text style={styles.qrCodeButtonText}>Tampilkan QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Modal QR Code */}
      <QRCodeModal />
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
    fontSize: 18,
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerActionButton: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transaksiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  kodeTransaksi: {
    fontSize: 20,
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: "#FFC107",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    color: darkTheme.colors.text,
    fontSize: 12,
    fontWeight: "bold",
  },
  detailSection: {
    backgroundColor: darkTheme.colors.secondary,
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: darkTheme.colors.text,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    color: darkTheme.colors.subText,
    fontSize: 14,
  },
  detailValue: {
    color: darkTheme.colors.text,
    fontSize: 14,
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: darkTheme.colors.primary,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.colors.accent,
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: darkTheme.colors.text,
    marginLeft: 10,
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.colors.primary,
  },
  sectionSubTitle: {
    fontSize: 14,
    color: darkTheme.colors.text,
    fontWeight: "bold",
    marginBottom: 10,
  },
  kerusakanItem: {
    backgroundColor: darkTheme.colors.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  kerusakanItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.colors.secondary,
  },
  kerusakanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  kerusakanTitle: {
    color: darkTheme.colors.text,
    fontSize: 15,
    fontWeight: "bold",
  },
  statusBadgeSmall: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusTextSmall: {
    color: darkTheme.colors.text,
    fontSize: 10,
    fontWeight: "bold",
  },
  kerusakanDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  actionContainer: {
    padding: 16,
    backgroundColor: darkTheme.colors.primary,
  },
  qrCodeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.colors.accent,
    padding: 15,
    borderRadius: 8,
  },
  qrCodeButtonText: {
    color: darkTheme.colors.text,
    marginLeft: 10,
    fontWeight: "bold",
  },
  qrCodeModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  qrCodeModalContent: {
    width: "85%",
    backgroundColor: darkTheme.colors.primary,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  qrCodeTitle: {
    fontSize: 18,
    color: darkTheme.colors.text,
    fontWeight: "bold",
    marginBottom: 15,
  },
  qrCodeBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  qrCodeSubtitle: {
    color: darkTheme.colors.subText,
    marginBottom: 15,
    textAlign: "center",
  },
  qrCodeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  qrCodeActionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.colors.secondary,
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
  },
  qrCodeActionButtonText: {
    color: darkTheme.colors.text,
    marginLeft: 10,
  },
  qrCodeCloseButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.colors.accent,
    padding: 12,
    borderRadius: 8,
  },
  qrCodeCloseButtonText: {
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
});

export default DetailTransaksi;
