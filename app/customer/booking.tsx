import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text, Card, Menu, Provider } from "react-native-paper";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function CustomerBookingPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [car, setCar] = useState(""); // New state for car input
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("Select Time");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [note, setNote] = useState("");
  const [bookingType, setBookingType] = useState("choose");
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [branch, setBranch] = useState("branch1"); // New state for branch selection
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showServiceMenu, setShowServiceMenu] = useState(false);

  const handleBookAppointment = () => {
    const newAppointment = {
      id: Math.random().toString(),
      customer: name,
      phoneNumber: phoneNumber,
      car: car, // Include car details
      date: date.toDateString(),
      time: time,
      bookingType: bookingType,
      note: note,
      branch: branch, // Include selected branch
    };
    console.log("New Appointment:", newAppointment);
    // You can add logic here to save the appointment or navigate to another screen
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Hide the picker on Android after selection
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // For scrolldown and does not hide the comp
        style={styles.flex}
      >
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
                theme={{ colors: { primary: "#6200ee" } }} // Purple border
                textColor="#000" // Black text
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
                theme={{ colors: { primary: "#6200ee" } }} // Purple border
                textColor="#000" // Black text
              />

              {/* Car Input */}
              <TextInput
                label="Your Car"
                value={car}
                onChangeText={setCar}
                style={styles.input}
                mode="outlined"
                left={<TextInput.Icon icon="car" color="#6200ee" />}
                theme={{ colors: { primary: "#6200ee" } }} // Purple border
                textColor="#000" // Black text
              />

              {/* Branch Selection */}
              <Text style={styles.label}>Select Branch</Text>
              <Menu
                visible={showBranchMenu}
                onDismiss={() => setShowBranchMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setShowBranchMenu(true)}
                    style={styles.pickerButton}
                    labelStyle={{ color: "#6200ee" }} // Purple text
                    icon="map-marker" // Branch icon
                    theme={{ colors: { primary: "#6200ee" } }} // Purple border
                  >
                    {branch}
                  </Button>
                }
              >
                {branches.map((branchItem, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setBranch(branchItem);
                      setShowBranchMenu(false);
                    }}
                    title={branchItem}
                  />
                ))}
              </Menu>

              {/* Service Type Selection */}
              <Text style={styles.label}>Select Service Type</Text>
              <Menu
                visible={showServiceMenu}
                onDismiss={() => setShowServiceMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setShowServiceMenu(true)}
                    style={styles.pickerButton}
                    labelStyle={{ color: "#6200ee" }} // Purple text
                    icon="wrench" // Service icon
                    theme={{ colors: { primary: "#6200ee" } }} // Purple border
                  >
                    {bookingType}
                  </Button>
                }
              >
                {serviceTypes.map((service, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setBookingType(service);
                      setShowServiceMenu(false);
                    }}
                    title={service}
                  />
                ))}
              </Menu>

              {/* Date Picker */}
              <Text style={styles.label}>Select Date</Text>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.pickerButton}
                labelStyle={{ color: "#6200ee" }} // Purple text
                icon="calendar" // Purple icon
                theme={{ colors: { primary: "#6200ee" } }} // Purple border
              >
                Choose Date
              </Button>
              {showDatePicker && (
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                </View>
              )}

              {/* Time Dropdown */}
              <Text style={styles.label}>Select Time</Text>
              <Menu
                visible={showTimeMenu}
                onDismiss={() => setShowTimeMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setShowTimeMenu(true)}
                    style={styles.pickerButton}
                    labelStyle={{ color: "#6200ee" }} // Purple text
                    icon="clock" // Purple icon
                    theme={{ colors: { primary: "#6200ee" } }} // Purple border
                  >
                    {time}
                  </Button>
                }
              >
                {timeSlots.map((timeSlot, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setTime(timeSlot);
                      setShowTimeMenu(false);
                    }}
                    title={timeSlot}
                  />
                ))}
              </Menu>

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
                theme={{ colors: { primary: "#6200ee" } }} // Purple border
                textColor="#000" // Black text
              />
            </Card.Content>
          </Card>

          {/* Book Appointment Button */}
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleBookAppointment}
            labelStyle={{ color: "#fff" }} // White text
            icon="calendar-check" // White icon
            theme={{ colors: { primary: "#6200ee" } }} // Purple background
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
    borderColor: "#6200ee", // Purple border
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#6200ee", // Purple background
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Black text
    marginBottom: 8,
  },
  datePickerContainer: {
    marginBottom: 16,
    alignItems: "center", // Center the date picker
  },
});
