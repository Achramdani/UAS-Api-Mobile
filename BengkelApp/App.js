import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/Screens/Auth/LoginScreen";
import AdminDashboard from "./src/Screens/Admin/AdminDashboard";
import KasirDashboard from "./src/Screens/Kasir/KasirDashboard";
import TeknisiDashboard from "./src/Screens/Teknisi/TeknisiDashboard";
import PelangganDashboard from "./src/Screens/Pelanggan/PelangganDashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#1E1E1E" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          cardStyle: { backgroundColor: "#1E1E1E" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ title: "Admin Dashboard" }}
        />
        <Stack.Screen
          name="KasirDashboard"
          component={KasirDashboard}
          options={{ title: "Kasir Dashboard" }}
        />
        <Stack.Screen
          name="TeknisiDashboard"
          component={TeknisiDashboard}
          options={{ title: "Teknisi Dashboard" }}
        />
        <Stack.Screen
          name="PelangganDashboard"
          component={PelangganDashboard}
          options={{ title: "Pelanggan Dashboard" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
