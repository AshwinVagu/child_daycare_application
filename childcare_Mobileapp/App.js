
// Importing the necessary modules from React Native
import { StatusBar } from 'expo-status-bar'; // Importing StatusBar from Expo
import { StyleSheet, Text, View } from 'react-native'; // Importing necessary components from React Native
import Register from '../childcare_Mobileapp/components/register/register'; // Importing Register component
import Login from '../childcare_Mobileapp/components/register/login'; // Importing Login component
import { NavigationContainer } from '@react-navigation/native'; // Importing NavigationContainer from React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importing createNativeStackNavigator from React Navigation
import Home from './components/register/home'; // Importing Home component
import Profile from './components/register/profile'; // Importing Profile component
import AddChild from './components/register/add-child';
import ViewChildDetails from './components/register/view-child-details';
import TabNavigator from './components/register/tab-navigator';
import EditChildDetails from './components/register/Edit-child-details'


// Creating a nativeStackNavigator object.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Inside the navigation container */}
      {/* Setting up the initial route */}
      <Stack.Navigator initialRouteName="Registration">
        {/* Setting up all the components in the navigation stack */}
        <Stack.Screen name="Register" component={Register} options={{ title: 'Registration' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ title: '' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="AddChild" component={AddChild} options={{ title: 'AddChild' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="ViewChildDetails" component={ViewChildDetails} options={{ title: 'View Child Details' }} />
        <Stack.Screen name="EditChildDetails" component={EditChildDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



