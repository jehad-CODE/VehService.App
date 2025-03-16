import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text } from "react-native-paper";

// Mock data for service tracking
const serviceTracking = [
  {
    id: "1",
    serviceType: "Oil Change",
    date: "March 12, 2025",
    status: "Completed",
  },
  {
    id: "2",
    serviceType: "Tire Rotation",
    date: "March 15, 2025",
    status: "In Progress",
  },
  {
    id: "3",
    serviceType: "Brake Service",
    date: "March 20, 2025",
    status: "Scheduled",
  },
  {
    id: "4",
    serviceType: "Engine Tune-Up",
    date: "April 1, 2025",
    status: "Scheduled",
  },
];

export default function TrackService() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Services</Text>

      <FlatList
        data={serviceTracking}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.serviceType}>{item.serviceType}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text
                style={[
                  styles.status,
                  item.status === "Completed" && styles.statusCompleted,
                  item.status === "In Progress" && styles.statusInProgress,
                  item.status === "Scheduled" && styles.statusScheduled,
                ]}
              >
                Status: {item.status}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
    padding: 10,
  },
  serviceType: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "bold",
  },
  statusCompleted: {
    color: "green", // Green for completed services
  },
  statusInProgress: {
    color: "orange", // Orange for in-progress services
  },
  statusScheduled: {
    color: "blue", // Blue for scheduled services
  },
});