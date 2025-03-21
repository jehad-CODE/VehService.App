import React from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, ScrollView } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function UserHome() {
  const router = useRouter();
  const user = { name: "Jehad" };

  const signOut = () => {
    // Sign-out logic here (clear tokens, redirect to login screen)
    router.push("/(tabs)"); // Redirect to tabs (assuming this takes the user to login screen or dashboard)
  };

  return (
    <ImageBackground
      source={require("@/assets/images/customer-home.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Welcome, {user.name}!</Text>

          <View style={styles.cardContainer}>
            {/* Book a Service Card */}
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Avatar.Icon size={width * 0.1} icon="car" style={styles.cardIcon} />
                <Button
                  mode="contained"
                  onPress={() => router.push("/customer/booking")}
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
                <Avatar.Icon size={width * 0.1} icon="history" style={styles.cardIcon} />
                <Button
                  mode="contained"
                  onPress={() => router.push("/customer/vehicle-history")}
                  style={styles.cardButton}
                  labelStyle={styles.buttonText}
                  contentStyle={styles.buttonContent}
                >
                  View History
                </Button>
              </View>
            </Card>

            {/* Track Services Card */}
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Avatar.Icon size={width * 0.1} icon="map-marker" style={styles.cardIcon} />
                <Button
                  mode="contained"
                  onPress={() => router.push("/customer/service-tracking")}
                  style={styles.cardButton}
                  labelStyle={styles.buttonText}
                  contentStyle={styles.buttonContent}
                >
                  Track Service
                </Button>
              </View>
            </Card>

            {/* Profile Card */}
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Avatar.Icon size={width * 0.1} icon="account" style={styles.cardIcon} />
                <Button
                  mode="contained"
                  onPress={() => router.push("/customer/CustomerProfile")}
                  style={styles.cardButton}
                  labelStyle={styles.buttonText}
                  contentStyle={styles.buttonContent}
                >
                  My Profile
                </Button>
              </View>
            </Card>
          </View>
        </ScrollView>

        {/* Sign-out Button */}
        <Button
          mode="contained"
          onPress={signOut}
          style={styles.signOutButton}
          labelStyle={styles.buttonText}
        >
          Sign Out
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    width: "100%",
    paddingBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    fontSize: width * 0.07, // Making the title responsive
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  signOutButton: {
    width: "50%",
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#D32F2F",
    marginTop: 20,
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
    width: width * 0.45, // Adjusting width to be responsive
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#1E88E5",
  },
  buttonText: {
    fontSize: width * 0.035, // Adjusting font size based on screen width
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContent: {
    justifyContent: "center",
  },
});
