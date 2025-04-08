import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ScrollView, Alert } from "react-native";
import { Card, Text, IconButton, Modal, Portal, Button, Provider } from "react-native-paper";
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

export default function MainBranchAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((a: Appointment) => a.branch === "main");
        setAppointments(filtered);
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  const openModal = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setStatus(appointment.status);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentAppointment(null);
  };

  // Handle submitting the updated appointment details
  const handleSaveChanges = () => {
    if (currentAppointment) {
      const updatedDetails = { ...currentAppointment, status }; // Create updatedDetails with the new status

      fetch(`http://localhost:5000/api/admin/edit/bookings/${currentAppointment.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Booking updated:", data);
          setAppointments(appointments.map((appt) =>
            appt.email === currentAppointment.email ? updatedDetails : appt
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
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={appointments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.customer} subtitle={`📧 ${item.email}`} titleStyle={styles.text} subtitleStyle={styles.text} />
              <Card.Content>
                <Text style={styles.text}>📅 Date: {item.date}</Text>
                <Text style={styles.text}>⏰ Time: {item.time}</Text>
                <Text style={styles.text}>🛠️ Service: {item.bookingType}</Text>
                <Text style={styles.text}>🏢 Branch: {item.branch}</Text>
                <Text style={styles.text}>📞 Phone: {item.phoneNumber}</Text>
                <Text style={styles.text}>🚗 Car: {item.car}</Text>
                <Text style={styles.text}>📝 Note: {item.note}</Text>
                <Text style={styles.text}>Status: <Text style={[styles.text, { fontWeight: "bold" }]}>{item.status}</Text></Text>
              </Card.Content>
              <Card.Actions>
                <IconButton icon="pencil" iconColor="#1976d2" onPress={() => openModal(item)} />
                <IconButton icon="delete" iconColor="#d32f2f" onPress={() => handleDelete(item.email)} />
              </Card.Actions>
            </Card>
          )}
        />

        <Portal>
          <Modal visible={isModalVisible} onDismiss={closeModal} contentContainerStyle={styles.modal}>
            <Text style={[styles.text, { fontSize: 18, marginBottom: 10 }]}>Update Status</Text>
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              style={styles.picker}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="approved" value="approved" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Cancelled" value="Cancelled" />
            </Picker>
            <Button mode="contained" onPress={handleSaveChanges} style={{ marginTop: 10, backgroundColor:'green' }}>
              Save
            </Button>
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff", // White background
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#ffffff", // White background for cards
    marginBottom: 12,
    borderRadius: 10,
    elevation: 5,
  },
  modal: {
    backgroundColor: "#ffffff", // White background for modal
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    color: "black",
  },
  text: {
    color: "black",
  },

});
