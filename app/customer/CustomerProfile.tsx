import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get("window");

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007bff",
    outline: "black",
  },
};

export default function CustomerProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setName(user.name || ""); // Ensure name is not empty
          setEmail(user.email || ""); // Ensure email is not empty
          setPassword(""); // Don't show password for security reasons
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load user data.");
      }
    };

    loadUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and email cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user/update",
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={[styles.innerContainer, { width: width * 0.85 }]}>
            <Text style={styles.title}>Profile</Text>

            <TextInput
              label="Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              style={styles.input}
              theme={theme}
            />

            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              theme={theme}
            />

            <TextInput
              label="New Password (Optional)"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
              theme={theme}
              placeholder="Leave empty to keep current password"
            />

            <Button
              mode="contained"
              onPress={handleUpdateProfile}
              style={styles.button}
              contentStyle={styles.buttonContent}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#f4f4f4" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20 },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: { textAlign: "center", marginBottom: 20, fontWeight: "bold", fontSize: 24, color: "#007bff" },
  input: { marginBottom: 15, backgroundColor: "rgba(255, 255, 255, 0.9)" },
  button: { marginTop: 10, backgroundColor: "#007bff", borderRadius: 8 },
  buttonContent: { paddingVertical: 10 },
});
