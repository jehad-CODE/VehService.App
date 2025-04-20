import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import axios from "axios";

// Define the type for AdminRequest
interface AdminRequest {
  id: string;
  username: string;
  email: string;
  status: string;  // Add status field for tracking request approval
}

export default function AdminRequests() {
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch admin requests from the API
    const fetchAdminRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/superadmin/requests");
        setAdminRequests(response.data);  // Assuming the API response contains the requests array
      } catch (error) {
        Alert.alert("Error", "Failed to fetch admin requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRequests();
  }, []);

  // Handle edit (approve) request
  const handleApprove = async (id: string) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/superadmin/requests/${id}`, {
        status: 'approved',
      });
      setAdminRequests(prevState =>
        prevState.map(request =>
          request.id === id ? { ...request, status: 'approved' } : request
        )
      );
      Alert.alert("Success", "Request approved.");
    } catch (error) {
      Alert.alert("Error", "Failed to approve the request.");
    }
  };

  // Handle delete (reject) request
  const handleReject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/superadmin/requests/${id}`);
      setAdminRequests(prevState =>
        prevState.filter(request => request.id !== id)
      );
      Alert.alert("Success", "Request rejected.");
    } catch (error) {
      Alert.alert("Error", "Failed to reject the request.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Admin Requests</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={adminRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.textLabel}>Username:</Text>
                <Text style={styles.textValue}>{item.username}</Text>

                <Text style={styles.textLabel}>Email:</Text>
                <Text style={styles.textValue}>{item.email}</Text>

                <Text style={styles.textLabel}>Status:</Text>
                <Text style={styles.textValue}>{item.status}</Text>
              </Card.Content>
              <Card.Actions>
                {item.status !== "approved" && (
                  <IconButton
                    icon="check"
                    size={20}
                    onPress={() => handleApprove(item.id)}  // Approve the request
                    iconColor="green"
                  />
                )}
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => handleReject(item.id)}  // Reject the request
                  iconColor="red"
                />
              </Card.Actions>
            </Card>
          )}
        />
      )}

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log("Add Admin")}
      >
        Add Admin
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
    fontSize: 26,
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
  textLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  textValue: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
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
