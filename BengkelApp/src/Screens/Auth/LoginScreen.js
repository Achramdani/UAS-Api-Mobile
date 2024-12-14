import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import darkTheme from "../../Theme/darkTheme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logic login akan ditambahkan kemudian
    // Sementara ini hanya navigasi berdasarkan role
    if (email === "admin@bengkel.com") {
      navigation.navigate("AdminDashboard");
    } else if (email === "kasir@bengkel.com") {
      navigation.navigate("KasirDashboard");
    } else if (email === "teknisi@bengkel.com") {
      navigation.navigate("TeknisiDashboard");
    } else if (email === "pelanggan@bengkel.com") {
      navigation.navigate("PelangganDashboard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Bengkel App</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={darkTheme.colors.subText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={darkTheme.colors.subText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.primary,
    justifyContent: "center",
  },
  loginContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    color: darkTheme.colors.text,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: darkTheme.colors.input,
    color: darkTheme.colors.text,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: darkTheme.colors.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: darkTheme.colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
