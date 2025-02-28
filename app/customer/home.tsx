import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserHome() {
  const router = useRouter();
  const user = { name: " jehad" };

  const navigateToBooking = () => {
    router.push("/customer/booking");
  };

  const navigateToVehicleHistory = () => {
    router.push("/customer/vehicle-history");
  };

  const navigateToCostEstimates = () => {
    router.push("/customer/cost-estimates");
  };

  const navigateToServiceTracking = () => {
    router.push("/customer/service-tracking");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/customer-home.jpg")} // Ensure correct path to your image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.name}!</Text>

        <View style={styles.cardContainer}>
          {/* Book a Service Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={50} icon="car" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToBooking}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Book Now
              </Button>
            </View>
          </Card>

          {/* Vehicle History Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={50} icon="history" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToVehicleHistory}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                View History
              </Button>
            </View>
          </Card>

          {/* Get Cost Estimates Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={50} icon="calculator" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToCostEstimates}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Get Estimate
              </Button>
            </View>
          </Card>

          {/* Track Services Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={50} icon="map-marker" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToServiceTracking}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Track Service
              </Button>
            </View>
          </Card>
        </View>

        {/* Floating Action Button for Quick Action */}
        <Button
          mode="contained"
          style={styles.floatingButton}
          onPress={navigateToBooking}
          icon="plus"
        >
          New Service
        </Button>
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

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
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "column",
    width: "100%",
    paddingBottom: 20,
  },
  card: {
    width: width * 0.9, // Make each card responsive based on screen width
    marginVertical: 10,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background to see the background image
    borderRadius: 15,
    elevation: 5,
    alignItems: "center",
    shadowColor: "#000", // Black shadow for the card
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  cardContent: {
    overflow: "hidden", // Move the overflow style here to fix the issue
  alignItems: "center",
  justifyContent: "space-evenly", // Corrected: Single justification for layout
  flexDirection: "row", // Align icon and button side by side
  width: "100%", // Ensures full width for the container
  },
  cardIcon: {
    backgroundColor: "#1E88E5", // Blue background for icons
    marginRight: 20,
    padding: 10,
    borderRadius: 25,
  },
  cardButton: {
    width: "50%", // Makes the button smaller
    paddingVertical: 12, // Reduced padding for a smaller button
    borderRadius: 20,
    backgroundColor: "#1E88E5", // Blue button
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16, // Reduced font size for smaller button text
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5, // Adjust padding for smaller text
  },
  buttonContent: {
    justifyContent: "center", // Centers the text inside the button
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
