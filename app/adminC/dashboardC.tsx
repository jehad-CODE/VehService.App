import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, ScrollView } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importing icons

const { width, height } = Dimensions.get("window");

export default function AdminHome() {
  const router = useRouter();

  // Sign-out function
  const signOut = () => {
    // Sign-out logic here (clear tokens, redirect to login screen)
    router.push("/(tabs)"); // Redirect to tabs
  };

  // Navigate to other sections
  const navigateToServiceCenters = () => {
    router.push("/admin/ServiceCenters");
  };

  const navigateToAppointments = () => {
    router.push("/adminC/NorthBranchAppointments");
  };

  const navigateToInventory = () => {
    router.push("/admin/inventory");
  };

  const navigateToTechnicians = () => {
    router.push("/admin/Technicians");
  };

  const navigateToBilling = () => {
    router.push("/admin/Billing");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/adminB-dashboardC.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome, AdminC!</Text>

        <View style={styles.cardContainer}>
          {/* Service Centers Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={width * 0.1} icon="office-building" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToServiceCenters}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Service Centers
              </Button>
            </View>
          </Card>

          {/* Appointments Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={width * 0.1} icon="calendar" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToAppointments}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Appointments
              </Button>
            </View>
          </Card>

          {/* Billing Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={width * 0.1} icon="cash" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToBilling}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Billing
              </Button>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.fabContainer}>
        <Button
          mode="contained"
          onPress={signOut}
          style={styles.fabButton}
        >
          <MaterialCommunityIcons name="exit-to-app" size={30} color="white" />
        </Button>
      </View>
    </ImageBackground>
  );
}

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
    justifyContent: "flex-start", // Align content from the top
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    paddingBottom: 40,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "black",
    marginBottom: 15,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "column",
    width: "100%",
    paddingBottom: 15,
    height: height * 0.5, // Adjust height to take half of the screen
    justifyContent: "flex-start", // Ensure the cards are placed at the top of the container
    marginTop: height * 0.1, // Add margin-top to move the cards down a bit
  },
  card: {
    width: width * 0.85,
    marginVertical: 8,
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
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
    backgroundColor: "#1E88E5",
    marginRight: 15,
    padding: 8,
    borderRadius: 20,
  },
  cardButton: {
    width: width * 0.45,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#1E88E5",
  },
  buttonText: {
    fontSize: width * 0.035,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContent: {
    justifyContent: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  fabButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
