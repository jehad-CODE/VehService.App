import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdminHome() {
  const router = useRouter();

  const navigateToManageServices = () => {
    router.push("/admin/ServiceCenters");
  };

  const navigateToManageAppointments = () => {
    router.push("/admin/appointments");
  };

  const navigateToViewCustomers = () => {
    router.push("/admin/Billing");
  };

  const navigateToAnalytics = () => {
    router.push("/admin/Technicians");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/admin-dashboard.jpg")} // Ensure correct path to your image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Admin!</Text>

        <View style={styles.cardContainer}>
          {/* Manage Services Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="wrench" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToManageServices}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Manage</Text>
                <Text style={styles.buttonText}>Services</Text>
              </Button>
            </View>
          </Card>

          {/* Manage Appointments Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="calendar" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToManageAppointments}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Manage</Text>
                <Text style={styles.buttonText}>Appointments</Text>
              </Button>
            </View>
          </Card>

          {/* View Customers Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="account-group" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToViewCustomers}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>View</Text>
                <Text style={styles.buttonText}>Customers</Text>
              </Button>
            </View>
          </Card>

          {/* View Analytics Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="chart-line" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToAnalytics}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>View</Text>
                <Text style={styles.buttonText}>Analytics</Text>
              </Button>
            </View>
          </Card>
        </View>

        {/* Floating Action Button for Quick Action */}
        
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to improve text visibility
    borderRadius: 15,
    width: "100%",
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "column",
    width: "100%",
    paddingBottom: 15,
  },
  card: {
    width: width * 0.85, // Matching the width of the customer card
    marginVertical: 8,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background to see the background image
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  cardIcon: {
    backgroundColor: "#1E88E5", // Blue background for icons
    marginRight: 15,
    padding: 8,
    borderRadius: 20,
  },
  cardButton: {
    width: "45%", // Match the button size to the customer button
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#1E88E5", // Blue button
  },
  buttonText: {
    fontSize: 16, // Adjusted for consistency with customer button
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20, // Adjust line height for better spacing between words
  },
  buttonContent: {
    justifyContent: "center", // Centers the text inside the button
    flexDirection: "column", // Stack text vertically
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF4081", // Floating button pink color
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 6,
  },
});
