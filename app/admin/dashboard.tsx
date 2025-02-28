import { StyleSheet, View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const router = useRouter();
  
  // Simulated check for admin login (this could be passed as a prop or via state)
  const user = { role: 'admin' }; // Replace this with actual login logic
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {user.role === 'admin' ? (
        <>
          <Text>Welcome, Admin!</Text>
          <Button title="Manage Appointments" onPress={() => router.push('/admin/appointments')} />
          <Button title="Manage Inventory" onPress={() => router.push('/admin/inventory')} />
        </>
      ) : (
        <Text>You are not authorized to view this page.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
