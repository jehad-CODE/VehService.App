import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, ScrollView } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";

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
    router.push("/admin/appointments");
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
  const navigateToAdminsReqs= () => {
    router.push("/admin/AdminsRequests");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/admin-dashboard.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome, Super Admin!</Text>

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

          {/* Inventory Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={width * 0.1} icon="package-variant" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToInventory}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Inventory
              </Button>
            </View>
          </Card>

          {/* Technicians Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={width * 0.1} icon="account-wrench" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToTechnicians}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Technicians
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
        {/* Admin Req  */}
        <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={width * 0.1} icon="clipboard-account" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToAdminsReqs}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                Admins requests 
              </Button>
            </View>
          </Card>
        </View>

        {/* Sign-Out Button at the Bottom of the Scroll */}
        <Button
          mode="contained"
          onPress={signOut}
          style={styles.signOutButton} // Apply red button style
        >
          Sign Out
        </Button>
      </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "100%",
    paddingBottom: 40,
  },
  title: {
    fontSize: width * 0.07, // Making the title responsive
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
    width: width * 0.85,
    marginVertical: 8,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
  signOutButton: {
    backgroundColor: "#D32F2F", 
    borderRadius: 12,
    paddingVertical: 10,
    width: width * 0.50, 
    alignSelf: "center",
    marginTop: 20, 
  },
});
