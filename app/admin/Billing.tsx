import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const invoices = [
  { id: "1", invoiceNumber: "INV-001", date: "2023-10-01", amount: "$150.00" },
  { id: "2", invoiceNumber: "INV-002", date: "2023-10-05", amount: "$200.00" },
];

export default function Billing() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        <Text style={styles.title}>Billing</Text>
      </LinearGradient>

      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.itemTitle}>{item.invoiceNumber}</Text>
              <Text style={styles.itemDetail}>Date: {item.date}</Text>
              <Text style={styles.itemDetail}>Amount: {item.amount}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="pencil" size={20} iconColor="#1976d2" onPress={() => {}} />
              <IconButton icon="delete" size={20} iconColor="#f44336" onPress={() => {}} />
            </Card.Actions>
          </Card>
        )}
      />

      <Button mode="contained" style={styles.button} icon="receipt">
        Generate Invoice
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