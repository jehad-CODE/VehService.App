import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text } from "react-native-paper";

// Mock data for service history
const serviceHistory = [
  {
    id: "1",
    date: "March 12, 2025",
    serviceType: "Oil Change",
    cost: "$50",
  },
  {
    id: "2",
    date: "March 15, 2025",
    serviceType: "Tire Rotation",
    cost: "$30",
  },
  {
    id: "3",
    date: "March 20, 2025",
    serviceType: "Brake Service",
    cost: "$100",
  },
  {
    id: "4",
    date: "April 1, 2025",
    serviceType: "Engine Tune-Up",
    cost: "$150",
  },
];

export default function ViewHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service History</Text>

      <FlatList
        data={serviceHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.serviceType}>{item.serviceType}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.cost}>Cost: {item.cost}</Text>
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
  cost: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});