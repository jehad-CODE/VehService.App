import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Button, Card, TextInput, Avatar } from "react-native-paper";

export default function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jehad",
    email: "jehad@example.com",
    phone: "+123 456 7890",
    car: "Toyota Camry 2020",
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save changes to the backend or local storage
    console.log("Profile updated:", user);
  };

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <Card style={styles.card}>
        <Card.Content>
          {/* Editable Name Field */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            {isEditing ? (
              <TextInput
                value={user.name}
                onChangeText={(value) => handleChange("name", value)}
                style={styles.input}
                mode="outlined"
                dense
              />
            ) : (
              <Text style={styles.value}>{user.name}</Text>
            )}
          </View>

          {/* Editable Email Field */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            {isEditing ? (
              <TextInput
                value={user.email}
                onChangeText={(value) => handleChange("email", value)}
                style={styles.input}
                mode="outlined"
                dense
              />
            ) : (
              <Text style={styles.value}>{user.email}</Text>
            )}
          </View>

          {/* Editable Phone Field */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone:</Text>
            {isEditing ? (
              <TextInput
                value={user.phone}
                onChangeText={(value) => handleChange("phone", value)}
                style={styles.input}
                mode="outlined"
                dense
              />
            ) : (
              <Text style={styles.value}>{user.phone}</Text>
            )}
          </View>

          {/* Editable Car Field */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Car:</Text>
            {isEditing ? (
              <TextInput
                value={user.car}
                onChangeText={(value) => handleChange("car", value)}
                style={styles.input}
                mode="outlined"
                dense
              />
            ) : (
              <Text style={styles.value}>{user.car}</Text>
            )}
          </View>
        </Card.Content>
      </Card>

      {/* Edit/Save Button */}
      <Button
        mode="contained"
        style={styles.editButton}
        onPress={isEditing ? handleSave : handleEdit}
        labelStyle={{ color: "#fff" }}
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#666",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    flex: 2,
  },
  input: {
    flex: 2,
    backgroundColor: "#fff",
  },
  editButton: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#6200ee",
    paddingVertical: 8,
  },
});