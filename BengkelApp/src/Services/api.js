import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://api-anda.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fungsi-fungsi API
export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData) => api.post("/auth/register", userData),
};

export const serviceService = {
  createBooking: (bookingData) => api.post("/services/booking", bookingData),
  getServices: () => api.get("/services"),
  updateServiceStatus: (serviceId, status) =>
    api.patch(`/services/${serviceId}`, { status }),
};

export const transaksiService = {
  createTransaksi: (transaksiData) => api.post("/transaksi", transaksiData),
  getTransaksi: () => api.get("/transaksi"),
};

export default api;
