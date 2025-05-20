import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import { Card, Text, Button, Modal, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";

interface Appointment {
  email: string;
  date: string;
  time: string;
  customer: string;
  bookingType: string;
  branch: string;
  note: string;
  status: string;
  phoneNumber: string;
  car: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/admin/bookings")
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  };

  const handleEdit = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setSelectedBranch(appointment.branch);
    setSelectedStatus(appointment.status);
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    if (currentAppointment) {
      const updatedAppointment = {
        ...currentAppointment,
        branch: selectedBranch,
        status: selectedStatus,
      };

      fetch(`http://localhost:5000/api/admin/edit/bookings/${currentAppointment.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAppointment),
      })
        .then((response) => response.json())
        .then((data) => {
          setAppointments(appointments.map((appt) => 
            appt.email === currentAppointment.email ? updatedAppointment : appt
          ));
          setModalVisible(false);
        })
        .catch((error) => console.error("Error updating booking:", error));
    }
  };

  const handleDelete = (email: string) => {
    fetch(`http://localhost:5000/api/admin/delete/bookings/${email}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments(appointments.filter((appointment) => appointment.email !== email));
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "approved") return "#4caf50";
    if (statusLower === "pending") return "#ff9800";
    if (statusLower === "rejected") return "#f44336";
    return "#757575";
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <Button 
          icon="refresh" 
          mode="contained" 
          onPress={fetchAppointments}
          style={styles.refreshButton}
        >
          Refresh
        </Button>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading appointments...</Text>
        </View>
      ) : appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="calendar-remove" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No appointments found</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.email}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.customerSection}>
                  <MaterialCommunityIcons name="account" size={24} color="#1976d2" />
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{item.customer}</Text>
                    <Text style={styles.emailText}>{item.email}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="calendar" size={18} color="#757575" />
                    <Text style={styles.detailText}>{item.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="clock-outline" size={18} color="#757575" />
                    <Text style={styles.detailText}>{item.time}</Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="car" size={18} color="#757575" />
                    <Text style={styles.detailText}>{item.car}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="wrench" size={18} color="#757575" />
                    <Text style={styles.detailText}>{item.bookingType}</Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="phone" size={18} color="#757575" />
                    <Text style={styles.detailText}>{item.phoneNumber}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="office-building" size={18} color="#757575" />
                    <Text style={styles.detailText}>{item.branch}</Text>
                  </View>
                </View>
                
                {item.note && (
                  <View style={styles.noteContainer}>
                    <MaterialCommunityIcons name="note-text" size={18} color="#757575" />
                    <Text style={styles.noteText}>{item.note}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.cardActions}>
                <Button 
                  mode="outlined" 
                  icon="pencil" 
                  onPress={() => handleEdit(item)}
                  style={styles.editButton}
                  textColor="#1976d2"
                >
                  Edit
                </Button>
                <Button 
                  mode="outlined" 
                  icon="delete" 
                  onPress={() => handleDelete(item.email)}
                  style={styles.deleteButton}
                  textColor="#f44336"
                >
                  Delete
                </Button>
              </View>
            </Card>
          )}
        />
      )}

      <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Appointment</Text>
        
        <Text style={styles.fieldLabel}>Branch</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBranch}
            onValueChange={(value) => setSelectedBranch(value)}
            style={styles.picker}
          >
            <Picker.Item label="North Branch" value="North" />
            <Picker.Item label="Main Branch" value="Main" />
          </Picker>
        </View>
        
        <Text style={styles.fieldLabel}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value)}
            style={styles.picker}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Approved" value="Approved" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
        </View>
        
        <View style={styles.modalActions}>
          <Button 
            mode="outlined" 
            onPress={() => setModalVisible(false)} 
            style={styles.cancelButtonModal}
            textColor="#757575"
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSaveChanges} 
            style={styles.saveButtonModal}
          >
            Save Changes
          </Button>
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
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  refreshButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#757575",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  customerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  customerInfo: {
    marginLeft: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
  },
  emailText: {
    fontSize: 12,
    color: "#757575",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#424242",
  },
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  noteText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#424242",
    flex: 1,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
    backgroundColor: "white",
  },
  editButton: {
    marginRight: 8,
    borderColor: "#1976d2",
  },
  deleteButton: {
    borderColor: "#f44336",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 16,
    textAlign: "center",
  },
  fieldLabel: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelButtonModal: {
    marginRight: 8,
    borderColor: "#e0e0e0",
  },
  saveButtonModal: {
    backgroundColor: "#1976d2",
  },
});