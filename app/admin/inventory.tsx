import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const inventoryItems = [
  { id: "1", name: "Oil Filter", quantity: 20 },
  { id: "2", name: "Brake Pads", quantity: 15 },
  { id: "3", name: "Engine Coolant", quantity: 10 },
];

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Management</Text>

      <FlatList
        data={inventoryItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => console.log("Edit Item", item.id)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => console.log("Delete Item", item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log("Add New Item")}
      >
        Add Item
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
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  itemDetails: {
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
