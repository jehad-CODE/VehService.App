import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const serviceCenters = [
  { id: "1", name: "Center 1", address: "Girne, Karakum, Branch1" },
  { id: "2", name: "Center 2", address: "Girne, Karakum, Branch2" },
];

export default function ServiceCenters() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        <Text style={styles.title}>Service Centers</Text>
      </LinearGradient>

      <FlatList
        data={serviceCenters}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDetail}>{item.address}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="pencil" size={20} iconColor="#1976d2" onPress={() => {}} />
              <IconButton icon="delete" size={20} iconColor="#f44336" onPress={() => {}} />
              <IconButton icon="map-marker" size={20} iconColor="#4caf50" onPress={() => {}} />
            </Card.Actions>
          </Card>
        )}
      />

      <Button mode="contained" style={styles.button} icon="plus">
        Add Center
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
  },
  itemDetail: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  button: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#1976d2",
    borderRadius: 8,
  }
});