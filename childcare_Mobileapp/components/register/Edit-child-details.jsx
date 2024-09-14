
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { styles } from '../register/register-style';  // Ensure this path matches your styles location
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditChildDetails = ({ route, navigation }) => {
  const [child, setChild] = useState(route.params.child);

  const handleUpdate = () => {
    console.log("Updating with:", child);

    AsyncStorage.getItem('userData')
    .then(data => {
      let profile_info = JSON.parse(data);
      let payload = {
        child_info: 
        {  
          child_id: child["child_id"],
          firstName: child["first_name"],
          lastName: child["last_name"],
          dateOfBirth: child["date_of_birth"],
          gender: child["gender"],
          parentsNames: child["parents_names"],
          parent_email: profile_info['parent_email'],
          address: child["address"],
          bloodGroup: child["blood_group"],
          emergencyContact: child["emergency_contact"],
          allergies: child["allergies"]
        }
      }
      
      axios.put('https://childcareapp.onrender.com/api/updateChildInformation/', payload)
      .then(response => {
        console.log("Success:", response.data);
        Alert.alert("Success", "Child details updated successfully.");
        navigation.goBack(); // Uncomment to navigate back upon success
      })
      .catch(error => {
        console.error('Error updating child:', error);
        Alert.alert("Error", error.message);
      });
    })
    .catch(error => {
        console.error('Error getting user Data:', error);
        Alert.alert("Error", error.message);
    })

    
};


  return (
    <ScrollView style={styles.scroll_container}>
      <Card>
        <Card.Title>Edit Child Details</Card.Title>
        <View>
          <TextInput style={styles.input} placeholder="First Name" value={child.first_name} onChangeText={(text) => setChild({...child, first_name: text})} />
          <TextInput style={styles.input} placeholder="Last Name" value={child.last_name} onChangeText={(text) => setChild({...child, last_name: text})} />
          <TextInput style={styles.input} placeholder="Parents Names" value={child.parents_names} onChangeText={(text) => setChild({...child, parents_names: text})} />
          <TextInput style={styles.input} placeholder="Date of Birth" value={child.date_of_birth} onChangeText={(text) => setChild({...child, date_of_birth: text})} />
          <TextInput style={styles.input} placeholder="Blood Group" value={child.blood_group} onChangeText={(text) => setChild({...child, blood_group: text})} />
          <TextInput style={styles.input} placeholder="Gender" value={child.gender} onChangeText={(text) => setChild({...child, gender: text})} />
          <Button title="Update" onPress={handleUpdate} />
        </View>
      </Card>
    </ScrollView>
  );
};

export default EditChildDetails;




