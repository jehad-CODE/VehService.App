import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdminHome() {
  const router = useRouter();

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

  return (
    <ImageBackground
      source={require("@/assets/images/admin-dashboard.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Admin!</Text>

        <View style={styles.cardContainer}>
          {/* Service Centers Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="office-building" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToServiceCenters}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Service Centers</Text>
              </Button>
            </View>
          </Card>

          {/* Appointments Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="calendar" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToAppointments}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Appointments</Text>
              </Button>
            </View>
          </Card>

          {/* Inventory Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="package-variant" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToInventory}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Inventory</Text>
              </Button>
            </View>
          </Card>

          {/* Technicians Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="account-wrench" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToTechnicians}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Technicians</Text>
              </Button>
            </View>
          </Card>

          {/* Billing Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={40} icon="cash" style={styles.cardIcon} />
              <Button
                mode="contained"
                onPress={navigateToBilling}
                style={styles.cardButton}
                labelStyle={styles.buttonText}
                contentStyle={styles.buttonContent}
              >
                <Text style={styles.buttonText}>Billing</Text>
              </Button>
            </View>
          </Card>
        </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
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
    width: "45%", 
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#1E88E5",
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContent: {
    justifyContent: "center",
    flexDirection: "column",
  },
});