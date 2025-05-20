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

// Define a type for valid icon names
type IconName = 
  | "car-wrench" 
  | "clock-outline"
  | "progress-wrench" 
  | "check-circle"
  | "close-circle"
  | "help-circle"
  | "car"
  | "calendar"
  | "note-text"
  | "car-off";

interface StatusInfo {
  color: string;
  icon: IconName;
}

export default function TrackService() {
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

  // Get status icon and color
  const getStatusInfo = (status: string): StatusInfo => {
    const statusLower = status.toLowerCase();
    
    if (statusLower === "pending") {
      return { color: "#ff9800", icon: "clock-outline" };
    } else if (statusLower === "in progress") {
      return { color: "#2196f3", icon: "progress-wrench" };
    } else if (statusLower === "approved") {
      return { color: "#4caf50", icon: "check-circle" };
    } else if (statusLower === "cancelled") {
      return { color: "#f44336", icon: "close-circle" };
    } else {
      return { color: "#757575", icon: "help-circle" };
    }
  };

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
        <Text style={styles.title}>Service Tracking</Text>
      </LinearGradient>
      
      {services.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="car-off" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No service records found</Text>
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const { color, icon } = getStatusInfo(item.status);
            
            return (
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons name="car-wrench" size={22} color="#1976d2" />
                  <Text style={styles.serviceType}>{item.bookingType}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: color }]}>
                    <MaterialCommunityIcons name={icon} size={12} color="white" />
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="car" size={18} color="#757575" />
                    <Text style={styles.infoText}>{item.car}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={18} color="#757575" />
                    <Text style={styles.infoText}>
                      {new Date(item.date).toLocaleDateString()} at {item.time}
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
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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