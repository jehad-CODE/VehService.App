import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function CustomerBookingPage() {
  const router = useRouter();
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
  const [step, setStep] = useState(1);

  useEffect(() => {
    AsyncStorage.getItem("userEmail").then(email => email && setUserEmail(email));
  }, []);

  const branchOptions = [
    { label: "Main Branch", value: "main" },
    { label: "North Branch", value: "north" },
  ];

  const serviceOptions = [
    { label: "Oil Change - $50", value: "oil_change $50" },
    { label: "Brake Repair - $100", value: "brake_repair $100" },
  ];

  const handleBookAppointment = async () => {
    if (!userEmail) {
      alert("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: name,
          email: userEmail,
          phoneNumber,
          car,
          date: date.toISOString().split("T")[0],
          time,
          bookingType,
          note,
          branch,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        router.push("/customer/home");
      } else {
        alert(result.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Network error. Please try again.");
    }
  };

  const nextStep = () => {
    if (step === 1 && (!name || !phoneNumber || !car || !userEmail)) {
      alert("Please fill in all personal details");
      return;
    }
    if (step === 2 && (!branch || !bookingType)) {
      alert("Please select a branch and service");
      return;
    }
    setStep(step + 1);
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Personal Details</Text>
            <TextInput label="Your Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" left={<TextInput.Icon icon="account" />} outlineColor="#1976d2" activeOutlineColor="#1976d2" />
            <TextInput label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} keyboardType="phone-pad" mode="outlined" left={<TextInput.Icon icon="phone" />} outlineColor="#1976d2" activeOutlineColor="#1976d2" />
            <TextInput label="Your Car" value={car} onChangeText={setCar} style={styles.input} mode="outlined" left={<TextInput.Icon icon="car" />} outlineColor="#1976d2" activeOutlineColor="#1976d2" />
            <TextInput label="Your Email" value={userEmail} onChangeText={setUserEmail} style={styles.input} mode="outlined" left={<TextInput.Icon icon="email" />} outlineColor="#1976d2" activeOutlineColor="#1976d2" />
            <Button mode="contained" style={styles.nextButton} onPress={nextStep} contentStyle={styles.buttonContent}>Next</Button>
          </>
        );
      
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Service Details</Text>
            <Text style={styles.label}>Select Branch</Text>
            <Dropdown data={branchOptions} labelField="label" valueField="value" value={branch} onChange={(item) => setBranch(item.value)} style={styles.dropdown} placeholder="Choose a branch" />
            <Text style={styles.label}>Select Service</Text>
            <Dropdown data={serviceOptions} labelField="label" valueField="value" value={bookingType} onChange={(item) => setBookingType(item.value)} style={styles.dropdown} placeholder="Choose a service" />
            <View style={styles.buttonRow}>
              <Button mode="outlined" textColor="#1976d2" style={styles.backButton} onPress={() => setStep(1)}>Back</Button>
              <Button mode="contained" style={styles.nextButton} onPress={nextStep}>Next</Button>
            </View>
          </>
        );
      
      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Appointment Time</Text>
            <Text style={styles.label}>Select Date</Text>
            {Platform.OS === "web" ? (
              <input type="date" value={date.toISOString().split("T")[0]} onChange={(e) => setDate(new Date(e.target.value))} style={styles.webInput} />
            ) : (
              <>
                <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>{date.toDateString()}</Button>
                {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={(e, d) => { d && setDate(d); setShowDatePicker(false); }} />}
              </>
            )}
            <Text style={styles.label}>Select Time</Text>
            {Platform.OS === "web" ? (
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={styles.webInput} />
            ) : (
              <TextInput label="Time" value={time} onChangeText={setTime} style={styles.input} mode="outlined" left={<TextInput.Icon icon="clock" />} outlineColor="#1976d2" activeOutlineColor="#1976d2" />
            )}
            <TextInput label="Additional Notes" value={note} onChangeText={setNote} style={[styles.input, {height: 100}]} mode="outlined" multiline numberOfLines={3} left={<TextInput.Icon icon="note-text" />} outlineColor="#1976d2" activeOutlineColor="#1976d2" />
            <View style={styles.buttonRow}>
              <Button mode="outlined" textColor="#1976d2" style={styles.backButton} onPress={() => setStep(2)}>Back</Button>
              <Button mode="contained" style={styles.confirmButton} onPress={handleBookAppointment}>Confirm</Button>
            </View>
          </>
        );
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        
        <Text style={styles.title}>Book Your Appointment</Text>
      </LinearGradient>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map(i => (
            <React.Fragment key={i}>
              {i > 1 && <View style={[styles.stepLine, step >= i && styles.activeLine]} />}
              <View style={[styles.stepDot, step >= i && styles.activeStep]}>
                <Text style={styles.stepNumber}>{i}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
        
        <View style={styles.formCard}>
          {renderStepContent()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f5f7fa" },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  alignItems: 'center',
  },
  backBtn: { backgroundColor: 'transparent' },
  title: { fontSize: 20, fontWeight: "bold", color: "white", marginLeft: 10 },
  container: { flexGrow: 1, padding: 16 },
  formCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1976d2",
    textAlign: "center",
  },
  input: { marginBottom: 16, backgroundColor: "white" },
  label: { fontSize: 14, marginBottom: 8, color: "#424242", fontWeight: "500" },
  dropdown: {
    height: 50,
    borderColor: "#1976d2",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  nextButton: { backgroundColor: "#1976d2", marginTop: 8, borderRadius: 8 },
  backButton: { borderColor: "#1976d2", flex: 0.5, marginRight: 8 },
  confirmButton: { backgroundColor: "#4caf50", flex: 1, marginLeft: 8 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  buttonContent: { paddingVertical: 6 },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: { backgroundColor: "#1976d2" },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: "#e0e0e0",
  },
  activeLine: { backgroundColor: "#1976d2" },
  stepNumber: { color: "white", fontWeight: "bold" },
  dateButton: { borderColor: "#1976d2", marginBottom: 16 },
  webInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: "100%",
  },
});