import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Button, Alert } from "react-native";
import { Card, Text } from "react-native-paper";
import axios from "axios";

export default function ViewHistory() {
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold the phone number input
  const [serviceHistory, setServiceHistory] = useState<any[]>([]); // State to hold the service history data

  // Function to handle search and fetch data based on phone number
  const handleSearch = async () => {
    if (phoneNumber.trim() === "") {
      alert("Please enter a phone number.");
      return;
    }

    try {
      // Replace localhost with your machine's IP address when testing on a physical device
    const response = await axios.get(`http://localhost:5000/api/booking/search/${phoneNumber}`);
      
      // Assuming the response contains the service history data
      if (response.data && response.data.length > 0) {
        setServiceHistory(response.data); // Update state with fetched data
      } else {
        alert("No service history found for this phone number.");
        setServiceHistory([]); // Clear the previous data
      }
    } catch (error) {
      console.error("Error fetching service history:", error);
      alert("There was an error fetching the service history.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service History</Text>

      {/* Phone number input and search button */}
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Display the service history if available */}
      {serviceHistory.length > 0 ? (
        <FlatList
          data={serviceHistory}
          keyExtractor={(item) => item._id.toString()} // Use _id as unique identifier from MongoDB
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.serviceType}>{item.bookingType}</Text>
                <Text style={styles.date}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                <Text style={styles.cost}>Branch: {item.branch}</Text>
              </Card.Content>
            </Card>
          )}
        />
      ) : (
        <Text style={styles.noData}>No service history to display.</Text>
      )}
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
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
  noData: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
