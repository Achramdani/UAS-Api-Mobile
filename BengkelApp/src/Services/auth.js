import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:8001/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
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
