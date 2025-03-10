import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-paper";

export default function ServiceTracking() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Tracking</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text>Service 1</Text>
          <Text>Service 2</Text>
        </Card.Content>
      </Card>
      <Button mode="contained" style={styles.button}>
        Track Service
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