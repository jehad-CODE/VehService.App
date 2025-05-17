import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

interface AdminRequest {
  _id: string;
  username: string;
  email: string;
  status: string;
  role: string;
}

export default function AdminRequests() {
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(null);
  const [newStatus, setNewStatus] = useState("pending");
  const [newRole, setNewRole] = useState("admina");
  const [modalVisible, setModalVisible] = useState(false);

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

  const openEditModal = (request: AdminRequest) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setNewRole(request.role);
    setModalVisible(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;

    try {
      await axios.patch(`http://localhost:5000/api/edit/superadmin/requests/${selectedRequest._id}`, {
        status: newStatus,
        role: newRole,
      });
      setAdminRequests(prev =>
        prev.map(request =>
          request._id === selectedRequest._id
            ? { ...request, status: newStatus, role: newRole }
            : request
        )
      );
      Alert.alert("Success", "Request approved and updated.");
      setModalVisible(false);
      setSelectedRequest(null);
    } catch (error) {
      Alert.alert("Error", "Failed to approve the request.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/edit/superadmin/requests/${id}`, {
        status: "rejected",
      });
      setAdminRequests(prev =>
        prev.map(request =>
          request._id === id ? { ...request, status: "rejected" } : request
        )
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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.textLabel}>Username:</Text>
                <Text style={styles.textValue}>{item.username}</Text>
                <Text style={styles.textLabel}>Email:</Text>
                <Text style={styles.textValue}>{item.email}</Text>
                <Text style={styles.textLabel}>Status:</Text>
                <Text
                  style={[
                    styles.textValue,
                    item.status === "approved"
                      ? styles.approvedText
                      : item.status === "rejected"
                      ? styles.rejectedText
                      : styles.pendingText,
                  ]}
                >
                  {item.status}
                </Text>
                <Text style={styles.textLabel}>Role:</Text>
                <Text style={styles.textValue}>{item.role}</Text>
              </Card.Content>
              <Card.Actions>
                {item.status === "pending" && (
                  <IconButton
                    icon="check"
                    size={20}
                    onPress={() => openEditModal(item)}
                    iconColor="green"
                  />
                )}
                <IconButton
                  icon="close"
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

      {/* Modal for Editing */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Status and Role</Text>

            <Text style={styles.textLabel}>Select Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newStatus}
                onValueChange={(value) => setNewStatus(value)}
              >
                <Picker.Item label="Approved" value="approved" />
                <Picker.Item label="Pending" value="pending" />
                <Picker.Item label="Rejected" value="rejected" />
              </Picker>
            </View>

            <Text style={styles.textLabel}>Select Role</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newRole}
                onValueChange={(value) => setNewRole(value)}
              >
                <Picker.Item label="Admin A" value="admina" />
                <Picker.Item label="Admin B" value="adminb" />
                <Picker.Item label="Admin C" value="adminc" />
              </Picker>
            </View>

            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={handleApprove}
                style={[styles.modalButton, styles.confirmButton]}
                labelStyle={{ color: "white" }}
              >
                Confirm
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  setModalVisible(false);
                  setSelectedRequest(null);
                }}
                style={[styles.modalButton, styles.cancelButton]}
                labelStyle={{ color: "#1E90FF" }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
    elevation: 3,
  },
  textLabel: {
    fontWeight: "bold",
    marginTop: 6,
  },
  textValue: {
    marginBottom: 4,
  },
  approvedText: {
    color: "green",
    fontWeight: "bold",
  },
  rejectedText: {
    color: "red",
    fontWeight: "bold",
  },
  pendingText: {
    color: "orange",
    fontWeight: "bold",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1E90FF",
    borderRadius: 8,
  },
  buttonLabel: {
    color: "white",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: "#1E90FF",
    borderRadius: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 6,
  },
  confirmButton: {
    backgroundColor: "#1E90FF",
  },
  cancelButton: {
    borderColor: "#1E90FF",
  },
});
