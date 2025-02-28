import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    // Simulated authentication (Replace with real logic)
    if (email === "admin" && password === "admin123") {
      Alert.alert("Success", "Welcome Admin!");
      // Full path navigation to Admin Dashboard
      router.push('/admin/dashboard');
    } else if (email === "user" && password === "user123") {
      Alert.alert("Success", "Welcome User!");
      // Full path navigation to Customer Home
      router.push('/customer/home');
    } else {
      Alert.alert("Error", "Invalid credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Sign In</Text>

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

      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        Sign In
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
