import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

type Route = 
  | "/customer/booking"
  | "/customer/vehicle-history"
  | "/customer/service-tracking"
  | "/customer/CustomerProfile"
  | "/(tabs)";

// Properly type the icon names to match the MaterialCommunityIcons set
type IconName = 
  | "car-wrench" 
  | "history" 
  | "map-marker-check" 
  | "account-circle"
  | "chevron-right"
  | "logout";

interface MenuItem {
  title: string;
  subtitle: string;
  icon: IconName;
  route: Route;
}

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "#1976d2";
const DANGER_COLOR = "#D32F2F";

export default function UserHome(): React.ReactElement {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      title: "Book a Service",
      subtitle: "Schedule your vehicle maintenance",
      icon: "car-wrench",
      route: "/customer/booking"
    },
    {
      title: "Vehicle History",
      subtitle: "View your previous services",
      icon: "history",
      route: "/customer/vehicle-history"
    },
    {
      title: "Track Service",
      subtitle: "Monitor your current service",
      icon: "map-marker-check",
      route: "/customer/service-tracking"
    },
    {
      title: "My Profile",
      subtitle: "Manage your account details",
      icon: "account-circle",
      route: "/customer/CustomerProfile"
    }
  ];

  const signOut = () => {
    router.push("/(tabs)" as Route);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/customer-home.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.nameText}>Vehicle Owner</Text>
          </View>
        </View>
        
        {/* Main Menu */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard}
              activeOpacity={0.8}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={item.icon} size={28} color="white" />
              </View>
              
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              
              <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <MaterialCommunityIcons name="logout" size={22} color="white" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 90,
    paddingTop: 20,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: PRIMARY_COLOR,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  menuSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 3,
  },
  signOutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: DANGER_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});