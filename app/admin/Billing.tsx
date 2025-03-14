import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const invoices = [
  { id: "1", invoiceNumber: "INV-001", date: "2023-10-01", amount: "$150.00" },
  { id: "2", invoiceNumber: "INV-002", date: "2023-10-05", amount: "$200.00" },
];

export default function Billing() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing</Text>

      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.invoiceText}>Invoice</Text>
              <Text style={styles.invoiceDetails}>Number: {item.invoiceNumber}</Text>
              <Text style={styles.invoiceDetails}>Date: {item.date}</Text>
              <Text style={styles.invoiceDetails}>Amount: {item.amount}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="download"
                size={20}
                onPress={() => console.log("Download Invoice", item.id)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => console.log("Delete Invoice", item.id)}
              />
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => console.log("Edit Invoice", item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log("Generate New Invoice")}
      >
        Generate Invoice
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
  invoiceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  invoiceDetails: {
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