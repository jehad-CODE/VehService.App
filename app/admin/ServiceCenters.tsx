import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const serviceCenters = [
  { id: "1", name: "Center 1", address: "Girne, Karakum, Branch1" },
  { id: "2", name: "Center 2", address: "Girne, Karakum, Branch2" },
];

export default function ServiceCenters() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Centers</Text>

      <FlatList
        data={serviceCenters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.centerName}>{item.name}</Text>
              <Text style={styles.centerAddress}>{item.address}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => console.log("Edit Center", item.id)}
                iconColor="#1E90FF"
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => console.log("Delete Center", item.id)}
                iconColor="red"
              />
              <IconButton
                icon="map-marker"
                size={20}
                onPress={() => console.log("View on Map", item.id)}
                iconColor="green"
              />
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log("Add Center Pressed")}
      >
        Add Center
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
  centerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  centerAddress: {
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
