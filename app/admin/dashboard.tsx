import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Define TypeScript types
type Route = 
  | "/admin/ServiceCenters" 
  | "/admin/appointments" 
  | "/admin/inventory" 
  | "/admin/Technicians" 
  | "/admin/Billing" 
  | "/admin/AdminsRequests"
  | "/(tabs)";

type IconName = 
  | "office-building" 
  | "calendar-clock" 
  | "cube-outline" 
  | "account-wrench" 
  | "cash-multiple" 
  | "clipboard-text-outline"
  | "logout-variant";

interface MenuItem {
  title: string;
  icon: IconName;
  route: Route;
}

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "#1976d2"; // The blue color
const SECONDARY_COLOR = "#0d47a1"; // Darker blue for contrast
const ACCENT_COLOR = "#64b5f6"; // Lighter blue for accents
const DANGER_COLOR = "#f44336"; // Red color for sign out

export default function AdminHome(): React.ReactElement {
  const router = useRouter();
  
  // Menu items configuration
  const menuItems: MenuItem[] = [
    { title: "Service Centers", icon: "office-building", route: "/admin/ServiceCenters" },
    { title: "Appointments", icon: "calendar-clock", route: "/admin/appointments" },
    { title: "Inventory", icon: "cube-outline", route: "/admin/inventory" },
    { title: "Technicians", icon: "account-wrench", route: "/admin/Technicians" },
    { title: "Billing", icon: "cash-multiple", route: "/admin/Billing" },
    { title: "Owner Requests", icon: "clipboard-text-outline", route: "/admin/AdminsRequests" }
  ];

  // Sign out function
  const signOut = () => {
    router.push("/(tabs)" as Route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      
      {/* Header with profile section */}
      <LinearGradient colors={[PRIMARY_COLOR, SECONDARY_COLOR]} style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Admin Dashboard</Text>
            <Text style={styles.profileRole}>Super Administrator</Text>
          </View>
        </View>
      </LinearGradient>
      
      {/* Card Section */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionTitle}>Management Console</Text>
        
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={item.icon} size={30} color={PRIMARY_COLOR} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.cardIndicator} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Sign Out Button - Now Red */}
      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={signOut}
      >
        <MaterialCommunityIcons name="logout-variant" size={22} color="white" />
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  profileRole: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  cardSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: width * 0.43,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(25, 118, 210, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
    textAlign: "center",
  },
  cardIndicator: {
    width: 30,
    height: 3,
    backgroundColor: PRIMARY_COLOR,
    marginTop: 12,
    borderRadius: 2,
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
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  }
});