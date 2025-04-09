import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const adminRequests = [
  { id: "1", username: "adminOne", email: "admin1@example.com" },
  { id: "2", username: "adminTwo", email: "admin2@example.com" },
  { id: "3", username: "adminThree", email: "admin3@example.com" },
];

export default function AdminRequests() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Admin Requests</Text>

      <FlatList
        data={adminRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.textLabel}>Username:</Text>
              <Text style={styles.textValue}>{item.username}</Text>

              <Text style={styles.textLabel}>Email:</Text>
              <Text style={styles.textValue}>{item.email}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => console.log("Edit Admin", item.id)}
                iconColor="#1E90FF"
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => console.log("Delete Admin", item.id)}
                iconColor="red"
              />
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log("Add Admin")}
      >
        Add Admin
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
    padding: 10,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  textValue: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#1E90FF",
    paddingVertical: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});
