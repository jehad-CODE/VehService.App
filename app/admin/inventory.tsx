import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-paper";

export default function Inventory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </Card.Content>
      </Card>
      <Button mode="contained" style={styles.button}>
        Add Item
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});