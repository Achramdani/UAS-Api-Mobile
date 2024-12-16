import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.14:8000/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data) {
      // Simpan token dan informasi user
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("userRole", response.data.role);

      return {
        success: true,
        token: response.data.token,
        role: response.data.role,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login gagal",
    };
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userRole");
};

export const getPerbaikan = async () => {
  const token = await AsyncStorage.getItem("userToken");
  const response = await axios.get(`${BASE_URL}/transaksi/get_perbaikan`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTransaksi = async (data) => {
  const token = await AsyncStorage.getItem("userToken");
  const response = await axios.post(
    `${BASE_URL}/transaksi/create_transaksi`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTransaksi = async (filter) => {
  const token = await AsyncStorage.getItem("userToken");
  const response = await axios.get(
    `${BASE_URL}/transaksi/get_transaksi/` + filter,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTransaksiDetail = async (id) => {
  const token = await AsyncStorage.getItem("userToken");
  const response = await axios.get(
    `${BASE_URL}/transaksi/get_detail_transaksi/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
