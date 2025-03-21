import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text, Card, Menu, Provider } from "react-native-paper";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function CustomerBookingPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [car, setCar] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("Select Time");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [note, setNote] = useState("");
  const [bookingType, setBookingType] = useState("choose");
  const [branch, setBranch] = useState("branch1");
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showServiceMenu, setShowServiceMenu] = useState(false);

  const handleBookAppointment = () => {
    const newAppointment = {
      id: Math.random().toString(),
      customer: name,
      phoneNumber: phoneNumber,
      car: car,
      date: date.toDateString(),
      time: time,
      bookingType: bookingType,
      note: note,
      branch: branch,
    };
    console.log("New Appointment:", newAppointment);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const branches = ["Branch 1", "Branch 2"];
  const serviceTypes = ["Oil Change", "Tire Rotation", "Brake Service"];

  return (
    <Provider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Book Your Appointment</Text>

          <Card style={styles.card}>
            <Card.Content>
              {/* Name Input */}
              <TextInput
                label="Your Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
                left={<TextInput.Icon icon="account" color="#6200ee" />}
                theme={{ colors: { primary: "#6200ee" } }}
                textColor="#000"
              />

              {/* Phone Number Input */}
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                mode="outlined"
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="phone" color="#6200ee" />}
                theme={{ colors: { primary: "#6200ee" } }}
                textColor="#000"
              />

              {/* Car Input */}
              <TextInput
                label="Your Car"
                value={car}
                onChangeText={setCar}
                style={styles.input}
                mode="outlined"
                left={<TextInput.Icon icon="car" color="#6200ee" />}
                theme={{ colors: { primary: "#6200ee" } }}
                textColor="#000"
              />

              {/* Branch Selection */}
              <Text style={styles.label}>Select Branch</Text>
              <select
                style={styles.pickerButton}
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {branches.map((branchItem, index) => (
                  <option key={index} value={branchItem}>
                    {branchItem}
                  </option>
                ))}
              </select>

              {/* Service Type Selection */}
              <Text style={styles.label}>Select Service Type</Text>
              <select
                style={styles.pickerButton}
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
              >
                {serviceTypes.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              {/* Date Picker */}
              <Text style={styles.label}>Select Date</Text>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.pickerButton}
                labelStyle={{ color: "#6200ee" }}
                icon="calendar"
                theme={{ colors: { primary: "#6200ee" } }}
              >
                Choose Date
              </Button>
              {showDatePicker && (
                <View style={styles.datePickerContainer}>
                  <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
                </View>
              )}

              {/* Time Dropdown */}
              <Text style={styles.label}>Select Time</Text>
              <select
                style={styles.pickerButton}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {timeSlots.map((timeSlot, index) => (
                  <option key={index} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>

              {/* Note Input */}
              <TextInput
                label="Additional Notes"
                value={note}
                onChangeText={setNote}
                style={styles.input}
                mode="outlined"
                multiline
                numberOfLines={4}
                left={<TextInput.Icon icon="note" color="#6200ee" />}
                theme={{ colors: { primary: "#6200ee" } }}
                textColor="#000"
              />
            </Card.Content>
          </Card>

          {/* Book Appointment Button */}
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleBookAppointment}
            labelStyle={{ color: "#fff" }}
            icon="calendar-check"
            theme={{ colors: { primary: "#6200ee" } }}
          >
            Book Appointment
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
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
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  pickerButton: {
    marginBottom: 16,
    borderColor: "#6200ee",
    padding: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#6200ee",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  datePickerContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
});
