import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { CheckCircle } from "lucide-react-native";
import darkTheme from "../../Theme/darkTheme";
import { getPerbaikan, createTransaksi } from "../../Services/auth";

const TransaksiBaru = ({ navigation }) => {
  const [nominal, setNominal] = useState("");
  const [selectedPerbaikan, setSelectedPerbaikan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [perbaikanList, setPerbaikanList] = useState([]);

  useEffect(() => {
    fetchPerbaikan();
  }, []);

  const fetchPerbaikan = async () => {
    try {
      const response = await getPerbaikan();
      setPerbaikanList(response);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data perbaikan");
    }
  };

  const submitTransaksi = async () => {
    // Validasi input
    if (!selectedPerbaikan) {
      Alert.alert("Validasi", "Pilih perbaikan terlebih dahulu");
      return;
    }

    if (!nominal || isNaN(parseFloat(nominal))) {
      Alert.alert("Validasi", "Masukkan nominal dengan benar");
      return;
    }

    try {
      const transaksiData = {
        perbaikan_id: selectedPerbaikan.id,
        nominal: parseFloat(nominal),
      };

      console.log(transaksiData);

      // Panggil API untuk membuat transaksi
      let response = await createTransaksi(transaksiData);
      console.log(response);

      Alert.alert("Sukses", "Transaksi berhasil dibuat", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal membuat transaksi");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tambah Transaksi Baru</Text>

        {/* Pilih Perbaikan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Perbaikan</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.selectButtonText}>
              {selectedPerbaikan
                ? `${selectedPerbaikan.kode} - ${selectedPerbaikan.user.name}`
                : "Pilih Perbaikan"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Nominal */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nominal Transaksi</Text>
          <TextInput
            style={styles.input}
            value={nominal}
            onChangeText={setNominal}
            placeholder="Masukkan nominal transaksi"
            placeholderTextColor={darkTheme.colors.subText}
            keyboardType="numeric"
          />
        </View>

        {/* Tombol Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={submitTransaksi}>
          <CheckCircle color={darkTheme.colors.text} size={24} />
          <Text style={styles.submitButtonText}>Simpan Transaksi</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Pilih Perbaikan */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Perbaikan</Text>
            {perbaikanList.map((perbaikan) => (
              <TouchableOpacity
                key={perbaikan.id}
                style={[
                  styles.modalLayananItem,
                  selectedPerbaikan?.id === perbaikan.id && styles.selectedItem,
                ]}
                onPress={() => {
                  setSelectedPerbaikan(perbaikan);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalLayananNama}>{perbaikan.kode}</Text>
                <Text style={styles.modalLayananDetail}>
                  {perbaikan.user.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.primary,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: darkTheme.colors.text,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: darkTheme.colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: darkTheme.colors.secondary,
    color: darkTheme.colors.text,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: darkTheme.colors.secondary,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  selectButtonText: {
    color: darkTheme.colors.text,
    fontSize: 16,
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: darkTheme.colors.accent,
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: darkTheme.colors.text,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: darkTheme.colors.primary,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color: darkTheme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalLayananItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: darkTheme.colors.secondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: darkTheme.colors.accent,
  },
  modalLayananNama: {
    color: darkTheme.colors.text,
    fontWeight: "bold",
  },
  modalLayananDetail: {
    color: darkTheme.colors.subText,
  },
  modalCloseButton: {
    backgroundColor: darkTheme.colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: {
    color: darkTheme.colors.text,
  },
});

export default TransaksiBaru;
