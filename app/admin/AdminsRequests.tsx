import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert, Modal } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AdminRequest {
  _id: string;
  username: string;
  email: string;
  status: string;
  role: string;
}

export default function AdminRequests() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(null);
  const [newStatus, setNewStatus] = useState("pending");
  const [newRole, setNewRole] = useState("admina");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/superadmin/requests");
      setRequests(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch admin requests.");
    } finally {
      setLoading(false);
    }
  };

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
      setRequests(prev => prev.map(request => 
        request._id === selectedRequest._id ? { ...request, status: newStatus, role: newRole } : request
      ));
      Alert.alert("Success", "Request updated successfully.");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update request.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/edit/superadmin/requests/${id}`, { status: "rejected" });
      setRequests(prev => prev.map(request => 
        request._id === id ? { ...request, status: "rejected" } : request
      ));
      Alert.alert("Success", "Request rejected.");
    } catch (error) {
      Alert.alert("Error", "Failed to reject request.");
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'approved': return "#4caf50";
      case 'rejected': return "#f44336";
      default: return "#ff9800";
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        <Text style={styles.headerTitle}>Admin Requests</Text>
      </LinearGradient>
      
      {loading ? (
        <View style={styles.centerContainer}>
          <Text>Loading...</Text>
        </View>
      ) : requests.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="account-cancel" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No requests found</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <View style={styles.roleContainer}>
                  <MaterialCommunityIcons name="shield-account" size={18} color="#1976d2" />
                  <Text style={styles.roleText}>Role: {item.role}</Text>
                </View>
                
                <View style={styles.actionButtons}>
                  {item.status === "pending" && (
                    <Button 
                      mode="outlined" 
                      icon="check" 
                      onPress={() => openEditModal(item)}
                      style={styles.approveButton}
                      textColor="#4caf50"
                    >
                      Approve
                    </Button>
                  )}
                  <Button 
                    mode="outlined" 
                    icon="close" 
                    onPress={() => handleReject(item._id)}
                    style={styles.rejectButton}
                    textColor="#f44336"
                  >
                    Reject
                  </Button>
                </View>
              </View>
            </Card>
          )}
        />
      )}
      
      <Button
        mode="contained"
        icon="account-plus"
        style={styles.addButton}
        onPress={() => console.log("Add Admin")}
      >
        Add Admin
      </Button>

      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Request</Text>
            
            <Text style={styles.pickerLabel}>Status</Text>
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

            <Text style={styles.pickerLabel}>Role</Text>
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
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleApprove} style={styles.confirmBtn}>
                Confirm
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
    backgroundColor: "#f5f7fa",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#757575",
    marginTop: 10,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
  },
  email: {
    fontSize: 12,
    color: "#757575",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  roleText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#424242",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  approveButton: {
    borderColor: "#4caf50",
    marginRight: 8,
  },
  rejectButton: {
    borderColor: "#f44336",
  },
  addButton: {
    backgroundColor: "#1976d2",
    margin: 16,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 16,
    textAlign: "center",
  },
  pickerLabel: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelBtn: {
    marginRight: 8,
  },
  confirmBtn: {
    backgroundColor: "#1976d2",
  },
});