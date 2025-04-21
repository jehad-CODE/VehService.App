import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import axios from "axios";

interface AdminRequest {
  _id: string;
  username: string;
  email: string;
  status: string;
}

export default function AdminRequests() {
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/superadmin/requests");
        setAdminRequests(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch admin requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/edit/superadmin/requests/${id}`, {
        status: "approved",
      });
      setAdminRequests(prev =>
        prev.map(request =>
          request._id === id ? { ...request, status: "approved" } : request
        )
      );
      Alert.alert("Success", "Request approved.");
    } catch (error) {
      Alert.alert("Error", "Failed to approve the request.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/superadmin/requests/${id}`);
      setAdminRequests(prev => prev.filter(request => request._id !== id));
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
          keyExtractor={(item) => item._id}
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
                    onPress={() => handleApprove(item._id)}
                    iconColor="green"
                  />
                )}
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => handleReject(item._id)}
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
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  textLabel: {
    fontWeight: "bold",
  },
  textValue: {
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#6200ee",
  },
  buttonLabel: {
    color: "white",
  },
});
