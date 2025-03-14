import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Text, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api"; // Import the API instance
import axios from "axios";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Make API call to sign in user
      const response = await API.post("/auth/sign-in", {
        email,
        password,
      });

      // Save the JWT token to AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      // Redirect based on user role (if applicable)
      Alert.alert("Success", "Sign-in successful!");
      router.push("/customer/home"); // Redirect to customer home or admin dashboard
    } catch (error) {
      console.error("Sign-in error:", error); // Log the full error object
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        Alert.alert("Error", error.response?.data.message || "Invalid credentials.");
      } else {
        // Generic error
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Sign In
      </Text>

      <TextInput
        label="Email or Username"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}
        disabled={loading} // Disable button during loading
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      <Button mode="text" onPress={() => router.push("/auth/sign-up")}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
});