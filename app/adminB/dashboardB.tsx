import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Define TypeScript types
type Route = 
  | "/admin/ServiceCenters" 
  | "/adminB/MainBranchAppointments" 
  | "/admin/Billing"
  | "/(tabs)";

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "#1976d2"; 
const SECONDARY_COLOR = "#0d47a1";
const DANGER_COLOR = "#f44336";

export default function AdminBHome(): React.ReactElement {
  const router = useRouter();
  
  // Navigate to other sections
  const navigateToServiceCenters = () => {
    router.push("/admin/ServiceCenters" as Route);
  };

  const navigateToAppointments = () => {
    router.push("/adminB/MainBranchAppointments" as Route);
  };

  const navigateToBilling = () => {
    router.push("/admin/Billing" as Route);
  };

  // Sign-out function
  const signOut = () => {
    router.push("/(tabs)" as Route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with gradient */}
      <LinearGradient colors={[PRIMARY_COLOR, SECONDARY_COLOR]} style={styles.header}>
        <Text style={styles.adminTitle}>Admin B Dashboard</Text>
      </LinearGradient>
      
      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {/* Service Centers Card */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={navigateToServiceCenters}
          activeOpacity={0.8}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="office-building" size={34} color="white" />
          </View>
          <Text style={styles.menuTitle}>Service Centers</Text>
        </TouchableOpacity>

        {/* Appointments Card */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={navigateToAppointments}
          activeOpacity={0.8}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="calendar-check" size={34} color="white" />
          </View>
          <Text style={styles.menuTitle}>Appointments</Text>
        </TouchableOpacity>

        {/* Billing Card */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={navigateToBilling}
          activeOpacity={0.8}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="cash-multiple" size={34} color="white" />
          </View>
          <Text style={styles.menuTitle}>Billing</Text>
        </TouchableOpacity>
      </View>
      
      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <MaterialCommunityIcons name="logout-variant" size={24} color="white" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  adminTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  menuContainer: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  menuCard: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  signOutButton: {
    backgroundColor: DANGER_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    margin: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  signOutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  }
});