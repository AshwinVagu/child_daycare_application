import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { styles } from '../register/register-style';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Profile({ navigation }) {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    parentEmail: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('loginData').then(data => {
      const loginInfo = JSON.parse(data);
      if (loginInfo && loginInfo.username) {
        setLoading(true);
        axios.get(`https://childcareapp.onrender.com/api/getRegisteredUser?email=${loginInfo.username}`)
          .then(response => {
            setLoading(false);
            const { first_name, last_name, mobile_number, parent_email} = response.data; // Assume address is now included
            setProfileData({
              firstName: first_name,
              lastName: last_name,
              mobileNumber: mobile_number,
              parentEmail: parent_email,
            });
          })
          .catch(error => {
            setLoading(false);
            console.error('Error fetching profile data:', error);
            Alert.alert("Error", "Failed to retrieve profile data.");
          });
      }
    }).catch(error => {
    console.error('Error retrieving login data:', error);
    });
  }, []);

  const validateForm = () => { 
    let errors = {}; 
    let hasError = false;

    console.log(profileData);

  // Validate email field 
  if (!profileData.parentEmail) { 
    errors.parentEmail = 'Email is required.'
    hasError = true;
  } else if (!/\S+@\S+\.\S+/.test(profileData.parentEmail)) { 
      errors.parentEmail = 'Email is invalid.'
      hasError = true;
  } 
  
    // Validate first name field 
    if (!profileData.firstName) { 
      errors.firstName = 'First Name is required.'
      hasError = true;
    } 
  
    // Validate last name field 
    if (!profileData.lastName) { 
      errors.lastName = 'Last Name is required.'
      hasError = true;
    } 
  
    // Validate mobileNumber field 
    if (!profileData.mobileNumber) { 
      errors.mobileNumber = 'Mobile is required.'
      hasError = true;
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(profileData.mobileNumber)) { 
        errors.mobileNumber = 'Mobile is invalid.'
        hasError = true;
    } 
  
  
    // Set the errors and update form validity 
    setErrors(errors);
    return hasError;
  }; 

  const handleButtonPress = () => {
      if (editMode) {
        if(validateForm()){
          return;
        }
        setLoading(true);
          // Exit edit mode and update the profile details on the backend
          axios.put('https://childcareapp.onrender.com/api/updateRegisteredUser/', {
              parentEmail: profileData.parentEmail, // Assuming this is the identifier
              studentName: {
                  firstName: profileData.firstName,
                  lastName: profileData.lastName,
              },
              mobileNumber: profileData.mobileNumber,
          })
          .then(response => {
              setLoading(false);
              if (response.status === 200) {
                  Alert.alert("Success", "Profile updated successfully.");
                  // Optionally, refresh profile data here if the backend response includes it
              } else {
                  // Handle other statuses or errors as needed
                  Alert.alert("Error", "Profile update failed.");
              }
          })
          .catch(error => {
              setLoading(false);
              console.error('Error updating profile data:', error);
              Alert.alert("Error", "An error occurred while updating the profile.");
          });
      }
      setEditMode(!editMode); // Toggle edit mode regardless of success or error
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  }

  return (
    <ScrollView style={styles.scroll_container}>
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
      />
      {/* Text Inputs for profile data */}
      {/* Email (not editable), First Name, Last Name, Mobile Number, Address */}
      {/* Make sure to bind value and onChangeText for new Address input similar to others */}
      <Text style={styles.title}>Email:</Text>
      <TextInput style={styles.input} value={profileData.parentEmail} editable={false} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <Text style={styles.title}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={profileData.firstName}
        editable={editMode}
        onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
      <Text style={styles.title}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={profileData.lastName}
        editable={editMode}
        onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
      <Text style={styles.title}>Mobile Number:</Text>
      <TextInput
        style={styles.input}
        value={profileData.mobileNumber}
        editable={editMode}
        onChangeText={(text) => setProfileData({ ...profileData, mobileNumber: text })}
      />
      {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber}</Text>}
      <Button title={editMode ? "Save" : "Edit"} onPress={handleButtonPress} />
      <Text>{"\n"}</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Text>{"\n"}</Text>
    </ScrollView>
  );
}