import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text, IconButton, Modal, Button, Provider } from "react-native-paper";
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
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((a: Appointment) => a.branch.toLowerCase() === "main");
        setAppointments(filtered);
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  const handleEdit = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setSelectedStatus(appointment.status);
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    if (currentAppointment) {
      const updatedAppointment = { ...currentAppointment, status: selectedStatus };

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
          setModalVisible(false);
        })
        .catch((error) => {
          console.error("Error updating booking:", error);
        });
    }
  };

  const handleDelete = (email: string) => {
    fetch(`http://localhost:5000/api/admin/delete/bookings/${email}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setAppointments(appointments.filter((appointment) => appointment.email !== email));
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Main Branch Appointments</Text>

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.heading}>Appointment</Text>
                <Text style={styles.details}>Customer: {item.customer}</Text>
                <Text style={styles.details}>Email: {item.email}</Text>
                <Text style={styles.details}>Phone: {item.phoneNumber}</Text>
                <Text style={styles.details}>Car: {item.car}</Text>
                <Text style={styles.details}>Date: {item.date}</Text>
                <Text style={styles.details}>Time: {item.time}</Text>
                <Text style={styles.details}>Service Type: {item.bookingType}</Text>
                <Text style={styles.details}>Notes: {item.note}</Text>
                <Text style={styles.details}>Status: {item.status}</Text>
              </Card.Content>
              <Card.Actions>
                <IconButton icon="pencil" iconColor="#1976d2" onPress={() => handleEdit(item)} />
                <IconButton icon="delete" iconColor="#d32f2f" onPress={() => handleDelete(item.email)} />
              </Card.Actions>
            </Card>
          )}
        />

        <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>Update Status</Text>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value)}
            style={styles.picker}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Approved" value="Approved" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Cancelled" value="Cancelled" />
          </Picker>
          <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton}>
            Save
          </Button>
        </Modal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  details: {
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "green",
    marginTop: 10,
  },
});
