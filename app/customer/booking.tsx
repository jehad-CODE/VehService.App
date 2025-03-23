import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text, Card } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown"; // Import Dropdown

export default function CustomerBookingPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [car, setCar] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [note, setNote] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [branch, setBranch] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const branchOptions = [
    { label: "Main Branch", value: "main" },
    { label: "North Branch", value: "north" },
  ];

  const serviceOptions = [
    { label: "Oil Change - $50", value: "oil_change - $50" },
    { label: "Brake Repair - $100", value: "brake_repair - $100" },
  ];

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) setUserEmail(email);
    };
    getUserEmail();
  }, []);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleBookAppointment = async () => {
    const newAppointment = {
      customer: name,
      email: userEmail,
      phoneNumber,
      car,
      date: date.toISOString().split("T")[0],
      time,
      bookingType,
      note,
      branch,
    };

    try {
      const response = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        
      } else {
        alert(result.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Book Your Appointment</Text>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput label="Your Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" left={<TextInput.Icon icon="account" />} />
            <TextInput label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} keyboardType="phone-pad" mode="outlined" left={<TextInput.Icon icon="phone" />} />
            <TextInput label="Your Car" value={car} onChangeText={setCar} style={styles.input} mode="outlined" left={<TextInput.Icon icon="car" />} />

            {/* Dropdown for Branch */}
            <Text style={styles.label}>Select Branch</Text>
            <Dropdown
              data={branchOptions}
              labelField="label"
              valueField="value"
              value={branch}
              onChange={(item) => setBranch(item.value)}
              style={styles.dropdown}
            />

            {/* Dropdown for Service Type */}
            <Text style={styles.label}>Select Service</Text>
            <Dropdown
              data={serviceOptions}
              labelField="label"
              valueField="value"
              value={bookingType}
              onChange={(item) => setBookingType(item.value)}
              style={styles.dropdown}
            />

            {/* Date Picker */}
            <Text style={styles.label}>Select Date</Text>
            {Platform.OS === "web" ? (
              <input
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                style={styles.nativeInput}
              />
            ) : (
              <>
                <Button mode="outlined" onPress={() => setShowDatePicker(true)} icon="calendar">
                  {date.toDateString()}
                </Button>
                {showDatePicker && (
                  <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
                )}
              </>
            )}

            {/* Time Selection */}
            <Text style={styles.label}>Select Time</Text>
            {Platform.OS === "web" ? (
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={styles.nativeInput}
              />
            ) : (
              <TextInput label="Time" value={time} onChangeText={setTime} style={styles.input} mode="outlined" left={<TextInput.Icon icon="clock" />} />
            )}

            {/* Note Input */}
            <TextInput label="Additional Notes" value={note} onChangeText={setNote} style={styles.input} mode="outlined" multiline numberOfLines={3} left={<TextInput.Icon icon="note" />} />
          </Card.Content>
        </Card>

        {/* Book Appointment Button */}
        <Button mode="contained" style={styles.button} onPress={handleBookAppointment} icon="calendar-check">
          Book Appointment
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: 16, backgroundColor: "#f7f7f7" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#6200ee" },
  card: { marginBottom: 16, borderRadius: 8, elevation: 3, padding: 10, backgroundColor: "#fff" },
  input: { marginBottom: 16, backgroundColor: "#fff" },
  dropdown: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#6200ee",
    borderRadius: 5,
    marginBottom: 16,
    color: "#6200ee",
  },
  button: { marginTop: 20, borderRadius: 8, backgroundColor: "#6200ee", paddingVertical: 8 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8, color: "#6200ee" },
  nativeInput: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#6200ee",
    borderRadius: 5,
    marginBottom: 16,
    color: "#6200ee",
  },
});
