import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007bff',
    outline: 'black',
  },
};

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

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.0.103:5000/api/auth/signin', {
        email,
        password,
      });

      await AsyncStorage.setItem('token', response.data.token);
      const userRole = response.data.role;

      if (userRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (userRole === 'customer') {
        router.push('/customer/home');
      } else {
        Alert.alert('Error', 'Invalid user role.');
      }

      Alert.alert('Success', 'Sign-in successful!');
    } catch (error) {
      console.error('Sign-in error:', error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data.message || 'Invalid credentials.'
        : 'An unexpected error occurred.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={require('@/assets/images/login.jpg')} style={styles.background}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Sign In</Text>

              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                theme={theme}
              />

              <TextInput
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
                theme={theme}
              />

              <Button
                mode="contained"
                onPress={handleSignIn}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Button mode="text" onPress={() => router.push('/auth/sign-up')} style={styles.signUpButton}>
                Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.9, // Reduce opacity to make it slightly smaller
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // More transparent background
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#007bff',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent input
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  signUpButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  signUpText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
