import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Define the Type for serviceTracking data
interface Service {
  id: string;
  customer: string;
  car: string;
  bookingType: string;
  date: string;
  time: string;
  note?: string;
  status: string; // New field for status
}

export default function ViewHistory() {
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const email = await AsyncStorage.getItem("userEmail"); // Get email from AsyncStorage
      if (!email) {
        Alert.alert("Error", "No email found. Please sign in.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/booking/search/${email}`); // Use email to fetch data

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        if (data.length === 0) {
          Alert.alert("No Results", "No service history found for this email.");
        }

        setFilteredServices(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching service data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The effect runs once when the component is mounted

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#FFA500"; // Orange
      case "in progress":
        return "#1E90FF"; // Blue
      case "approved":
        return "#008000"; // Green
      case "cancelled":
        return "#FF0000"; // Red
      default:
        return "#000"; // Black (default)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service History</Text>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {filteredServices.length === 0 ? (
        <Text style={styles.noResults}>No results found</Text>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.serviceDetails}>
                  <Text style={styles.label}>Username:</Text>
                  <Text style={styles.value}>{item.customer}</Text>

                  <Text style={styles.label}>Car:</Text>
                  <Text style={styles.value}>{item.car}</Text>

                  <Text style={styles.label}>Service Type:</Text>
                  <Text style={styles.value}>{item.bookingType}</Text>

                  {item.note && (
                    <>
                      <Text style={styles.label}>Note:</Text>
                      <Text style={styles.value}>{item.note}</Text>
                    </>
                  )}

                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>
                    {new Date(item.date).toLocaleDateString()} at {item.time}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
        />
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
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
    padding: 12,
  },
  serviceDetails: {
    flexDirection: "column",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: "#222",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  noResults: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
