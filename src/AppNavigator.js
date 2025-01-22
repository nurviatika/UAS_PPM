import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import EditTodoScreen from './screens/EditTodoScreen';
import DetailTodoScreen from './screens/DetailTodoScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SignInScreen from './screens/SigninScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token); 
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditTodo" component={EditTodoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetailTodo" component={DetailTodoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
