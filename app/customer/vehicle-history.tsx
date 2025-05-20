import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import { Card, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Service {
  id: string;
  customer: string;
  car: string;
  bookingType: string;
  date: string;
  time: string;
  note?: string;
  status: string;
}

// Ensure icon names are valid
type IconName = 
  | "car" 
  | "calendar"
  | "calendar-clock" 
  | "car-wrench"
  | "note-text"
  | "history"
  | "car-off";

export default function ViewHistory() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (!email) return;
        
        const response = await fetch(`http://localhost:5000/api/booking/search/${email}`);
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchServices();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1976d2', '#0d47a1']} style={styles.header}>
        <Text style={styles.title}>Service History</Text>
      </LinearGradient>
      
      {services.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="history" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No service history found</Text>
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const lastServiceDate = new Date(item.date);
            const nextServiceDate = new Date(lastServiceDate);
            nextServiceDate.setMonth(lastServiceDate.getMonth() + 3);

            const today = new Date();
            const timeDiff = nextServiceDate.getTime() - today.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            const isDueSoon = daysRemaining <= 7;
            
            return (
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons name="car-wrench" size={22} color="#1976d2" />
                  <Text style={styles.serviceType}>{item.bookingType}</Text>
                  <View style={styles.carContainer}>
                    <MaterialCommunityIcons name="car" size={16} color="#757575" />
                    <Text style={styles.carText}>{item.car}</Text>
                  </View>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={18} color="#757575" />
                    <Text style={styles.infoText}>
                      Last service: {lastServiceDate.toLocaleDateString()} at {item.time}
                    </Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar-clock" size={18} color={isDueSoon ? "#f44336" : "#757575"} />
                    <Text style={[styles.infoText, isDueSoon ? styles.dueSoonText : {}]}>
                      Next service: {nextServiceDate.toLocaleDateString()} 
                      {isDueSoon ? " (Due Soon!)" : ""}
                    </Text>
                  </View>
                  
                  {item.note && (
                    <View style={styles.noteContainer}>
                      <MaterialCommunityIcons name="note-text" size={18} color="#757575" />
                      <Text style={styles.noteText}>{item.note}</Text>
                    </View>
                  )}
                </View>
              </Card>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "white",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  carContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  carText: {
    fontSize: 12,
    color: "#757575",
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#424242",
  },
  dueSoonText: {
    color: "#f44336",
    fontWeight: "bold",
  },
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  noteText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#424242",
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#757575",
    marginTop: 16,
  },
});