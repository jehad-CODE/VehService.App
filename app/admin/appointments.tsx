import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const appointments = [
  {
    id: "1",
    customer: "Jahad",
    date: "March 12, 2025",
    time: "10:00 AM",
    serviceType: "Oil Change",
    branch: "Branch 1",
    note: "Regular maintenance",
  },
  {
    id: "2",
    customer: "Shaheen",
    date: "March 15, 2025",
    time: "2:00 PM",
    serviceType: "Tire Rotation",
    branch: "Branch 2",
    note: "Check tire pressure",
  },
];

export default function AdminAppointments() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Appointments</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.appointmentText}>Appointment</Text>
              <Text style={styles.appointmentDetails}>
                {item.date} - {item.time}
              </Text>
              <Text style={styles.appointmentDetails}>
                Customer: {item.customer}
              </Text>
              <Text style={styles.appointmentDetails}>
                Service: {item.serviceType}
              </Text>
              <Text style={styles.appointmentDetails}>
                Branch: {item.branch}
              </Text>
              <Text style={styles.appointmentDetails}>
                Notes: {item.note}
              </Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => console.log("Edit Appointment", item.id)}
                iconColor="#6200ee" // Use iconColor instead of color
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => console.log("Delete Appointment", item.id)}
                iconColor="#6200ee" // Use iconColor instead of color
              />
              <IconButton
                icon="calendar-check"
                size={20}
                onPress={() => console.log("Confirm Appointment", item.id)}
                iconColor="#6200ee" // Use iconColor instead of color
              />
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log("Schedule New Appointment")}
      >
        Schedule Appointment
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
  appointmentText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  appointmentDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#6200ee",
    paddingVertical: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});