import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const technicians = [
  { id: "1", name: "John Doe", specialization: "Engine Repair", experience: "5 Years" },
  { id: "2", name: "Jane Smith", specialization: "Electrical Systems", experience: "3 Years" },
];

export default function AdminTechnicians() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Technicians</Text>

      <FlatList
        data={technicians}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.technicianText}>Technician</Text>
              <Text style={styles.technicianDetails}>Name: {item.name}</Text>
              <Text style={styles.technicianDetails}>Specialization: {item.specialization}</Text>
              <Text style={styles.technicianDetails}>Experience: {item.experience}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => console.log("Edit Technician", item.id)}
                iconColor="#1E90FF"
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => console.log("Delete Technician", item.id)}
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
        onPress={() => console.log("Add New Technician")}
      >
        Add Technician
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
    fontSize: 28,
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
  technicianText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  technicianDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
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