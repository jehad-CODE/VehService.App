import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useRouter } from "expo-router";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007bff",
    outline: "black",
  },
};

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

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });

      if (response.data.message === "User registered successfully") {
        Alert.alert("Success", "Account created successfully!");
        router.push("/auth/sign-in");
      } else {
        Alert.alert("Error", response.data.message || "Registration failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <ImageBackground
        source={require("@/assets/images/login.jpg")}
        style={[styles.background, { width, height }]}
        resizeMode="cover"
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={[styles.innerContainer, { width: width * 0.85 }]}>
              <Text style={styles.title}>Sign Up</Text>

              <TextInput
                label="Username"
                mode="outlined"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
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
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                theme={theme}
              />

              <TextInput
                label="Confirm Password"
                mode="outlined"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
                theme={theme}
              />

              <Button
                mode="contained"
                onPress={handleSignUp}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              <Button mode="text" onPress={() => router.push("/auth/sign-in")} style={styles.signInButton}>
                Already have an account? <Text style={styles.signInText}>Sign In</Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  container: { flex: 1, justifyContent: "center" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20 },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: { textAlign: "center", marginBottom: 20, fontWeight: "bold", fontSize: 26, color: "#007bff" },
  input: { marginBottom: 15, backgroundColor: "rgba(255, 255, 255, 0.8)" },
  button: { marginTop: 10, backgroundColor: "#007bff", borderRadius: 8 },
  buttonContent: { paddingVertical: 10 },
  signInButton: { marginTop: 10, alignSelf: "center" },
  signInText: { color: "#007bff", fontWeight: "bold" },
});
