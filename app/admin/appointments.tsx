import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, IconButton, Modal } from "react-native-paper";

// Define the type for an appointment
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
  const [updatedDetails, setUpdatedDetails] = useState<Appointment>({
    email: "",
    date: "",
    time: "",
    customer: "",
    bookingType: "",
    branch: "",
    note: "",
    status: "",
    phoneNumber: "",
    car: "",
  });

  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Fetch appointments from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings")
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data); // Update the state with fetched appointments
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  // Handle opening the modal for editing
  const handleEdit = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setUpdatedDetails(appointment);
    setSelectedBranch(appointment.branch);
    setSelectedStatus(appointment.status);
    setModalVisible(true); // Show the modal for editing
  };

  // Handle submitting the updated appointment details
  const handleSaveChanges = () => {
    if (currentAppointment) {
      const updatedAppointment = {
        ...updatedDetails,
        branch: selectedBranch,
        status: selectedStatus,
      };

      fetch(`http://localhost:5000/api/admin/edit/bookings/${currentAppointment.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppointment),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Booking updated:", data);
          setAppointments(appointments.map((appt) =>
            appt.email === currentAppointment.email ? updatedAppointment : appt
          ));
          setModalVisible(false); // Close the modal after saving changes
        })
        .catch((error) => {
          console.error("Error updating booking:", error);
        });
    }
  };

  // Handle deleting a booking by email
  const handleDelete = (email: string) => {
    console.log("Delete Appointment", email);

    fetch(`http://localhost:5000/api/admin/delete/bookings/${email}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking deleted:", data);
        // Remove the deleted booking from the state
        setAppointments(appointments.filter((appointment) => appointment.email !== email));
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Appointments</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.email} // Use email for unique key
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.appointmentText}>Appointment</Text>
              <Text style={styles.appointmentDetails}>Customer: {item.customer}</Text>
              <Text style={styles.appointmentDetails}>Email: {item.email}</Text>
              <Text style={styles.appointmentDetails}>Phone: {item.phoneNumber}</Text>
              <Text style={styles.appointmentDetails}>Car: {item.car}</Text>
              <Text style={styles.appointmentDetails}>Date: {item.date}</Text>
              <Text style={styles.appointmentDetails}>Time: {item.time}</Text>
              <Text style={styles.appointmentDetails}>Service Type: {item.bookingType}</Text>
              <Text style={styles.appointmentDetails}>Branch: {item.branch}</Text>
              <Text style={styles.appointmentDetails}>Notes: {item.note}</Text>
              <Text style={styles.appointmentDetails}>Status: {item.status}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => handleEdit(item)} // Pass the whole appointment object
                iconColor="#1E90FF" 
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => handleDelete(item.email)}
                iconColor="red"
              />
            </Card.Actions>
          </Card>
        )}
      />

      {/* Modal for editing an appointment */}
      <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
        {/* Branch dropdown */}
        <Text style={styles.dropdownLabel}>Branch</Text>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          style={styles.dropdown} // Use the style prop for inline styling
        >
          <option value="North">North</option>
          <option value="Main">Main</option>
        </select>

        {/* Status dropdown */}
        <Text style={styles.dropdownLabel}>Status</Text>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={styles.dropdown} // Use the style prop for inline styling
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton}>
          Save Changes
        </Button>
        <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.cancelButton}>
          Cancel
        </Button>
      </Modal>
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
  appointmentText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  appointmentDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#1E90FF",
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "black",
  },
  dropdownLabel: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
  },
  dropdown: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
