import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.column}>
          <Text style={styles.logoText}>T</Text>
          <Text style={styles.logoText}>D</Text>
          <Text style={styles.logoText}>L</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.logoText}>O</Text>
          <Text style={styles.logoText}>O</Text>
          <Text style={styles.logoText}>I</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.logoText}> </Text> 
          <Text style={styles.logoText}> </Text> 
          <Text style={styles.logoText}>S</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.logoText}> </Text> 
          <Text style={styles.logoText}> </Text> 
          <Text style={styles.logoText}>T</Text>
        </View>
        
        <Ionicons name="create-outline" size={60} color="#F79E89" style={styles.logoIcon} />
      </View>
      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  column: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#F79E89',
    letterSpacing: 4,
  },
  logoIcon: {
    marginLeft: 10, 
  },
  button: {
    backgroundColor: '#F79E89',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
