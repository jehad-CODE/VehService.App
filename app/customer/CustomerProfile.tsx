import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          setName(user.name || "");
          setEmail(user.email || "");
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
    <View style={styles.container}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </LinearGradient>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.formContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileIconContainer}>
            <MaterialCommunityIcons name="account-circle" size={80} color="#1976d2" />
          </View>
          
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="account" size={20} color="#1976d2" style={styles.inputIcon} />
              <TextInput
                label="Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                outlineColor="#1976d2"
                activeOutlineColor="#1976d2"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email" size={20} color="#1976d2" style={styles.inputIcon} />
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                outlineColor="#1976d2"
                activeOutlineColor="#1976d2"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock" size={20} color="#1976d2" style={styles.inputIcon} />
              <TextInput
                label="New Password (Optional)"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
                outlineColor="#1976d2"
                activeOutlineColor="#1976d2"
                placeholder="Leave empty to keep current password"
              />
            </View>
          </View>
          
          <Button
            mode="contained"
            onPress={handleUpdateProfile}
            style={styles.updateButton}
            loading={loading}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    top: 20,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    paddingLeft: 36,
  },
  updateButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 8,
    borderRadius: 8,
  },
});