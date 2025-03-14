import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Text, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api"; // Import the API instance
import axios from "axios";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Make API call to register user
      const response = await API.post("/auth/sign-up", {
        username,
        email,
        password,
      });

      // If registration is successful
      Alert.alert("Success", "Account created successfully!");
      router.push("/auth/sign-in"); // Redirect to Sign-In
    } catch (error) {
      console.error("Sign-up error:", error); // Log the full error object
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        Alert.alert("Error", error.response?.data.message || "Registration failed.");
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
        Sign Up
      </Text>

      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Email"
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

      <TextInput
        label="Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
        disabled={loading} // Disable button during loading
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      <Button mode="text" onPress={() => router.push("/auth/sign-in")}>
        Already have an account? Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
});