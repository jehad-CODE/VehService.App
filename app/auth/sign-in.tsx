// File: sign-in.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true); // Start loading
    try {
      // Make API call to sign in user
      const response = await axios.post('http://192.168.0.103:5000/api/auth/signin', {
        email,
        password,
      });

      // Save the JWT token to AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);

      // Redirect based on user role (admin or customer)
      const userEmail = response.data.email; // Get the email from the response
      const userRole = response.data.role; // Get the role from the response
      
      // Check if the email is "jehad@gmail.com" and the role is "admin"
      if (userEmail === 'jehad@gmail.com' && userRole === 'admin') {
        router.push('/admin/dashboard'); // Redirect to admin dashboard
      } else if (userRole === 'customer') {
        router.push('/customer/home'); // Redirect to customer home
      } else {
        Alert.alert('Error', 'Invalid user role or email.');
      }
      
      Alert.alert('Success', 'Sign-in successful!');
    } catch (error) {
      console.error('Sign-in error:', error);
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        Alert.alert('Error', error.response?.data.message || 'Invalid credentials.');
      } else {
        // Generic error
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Sign In
      </Text>

      <TextInput
        label="Email or Username"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={false} // Show password
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}
        disabled={loading} // Disable button during loading
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>

      <Button mode="text" onPress={() => router.push('/auth/sign-up')}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
});
