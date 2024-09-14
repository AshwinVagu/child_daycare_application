import React, {Component, useState} from "react";
import { View, Text, ScrollView, TextInput, Button, Image } from "react-native";
import { styles } from '../register/register-style';
import * as ImagePicker from 'expo-image-picker';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';


class AddChild extends Component {
    
    state = {
        firstName: '',
        lastName: '',
        photo: '',
        height: '',
        weight: '',
        dob: '',
        gender: '',
        blood_group: '',
        address: '',
        emergency_contact: '',
        allergies: '',
        showCalendar: false,
        loading: false,
        errors: {}
    };
   
    handleShowCalendar = () => {
        this.setState({showCalendar : !this.state.showCalendar});
    }

    validateForm = () => { 
        let errors = {}; 
        let hasError = false;
      
        // Validate first name field 
        if (!this.state.firstName) { 
          errors.firstName = 'First Name is required.'
          hasError = true;
        } 
      
        // Validate last name field 
        if (!this.state.lastName) { 
          errors.lastName = 'Last Name is required.'
          hasError = true;
        } 
      
        // Validate height field 
        if (!this.state.height) { 
          errors.height = 'Height is required.'
          hasError = true;
        } else if (!/^\d+$/.test(this.state.height)) { 
            errors.height = 'Height is invalid.'
            hasError = true;
        } 
      
        // Validate weight field 
        if (!this.state.weight) { 
          errors.weight = 'Weight is required.'
          hasError = true;
        } else if (!/^\d+$/.test(this.state.weight)) { 
            errors.weight = 'Weight is invalid.'
            hasError = true;
        } 
      
        // Validate gender field 
        if (!this.state.gender) { 
          errors.gender = 'Gender is required.'
          hasError = true;
        } 
      
        // Validate blood group field 
        if (!this.state.blood_group) { 
          errors.blood_group = 'Blood group is required.'
          hasError = true;
        } 
      
        // Validate dob field 
        if (!this.state.dob) { 
          errors.dob = 'Date of Birth is required.'
          hasError = true;
        } 

        // Validate address field 
        if (!this.state.address) { 
            errors.address = 'Address is required.'
            hasError = true;
        } 

        // Validate emergency contact field 
        if (!this.state.emergency_contact) { 
            errors.emergency_contact = 'Emergency contact is required.'
            hasError = true;
        } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.state.emergency_contact)) { 
            errors.emergency_contact = 'Emergency contact is invalid.'
            hasError = true;
        } 
      
        // Set the errors and update form validity 
        this.setState({errors})
        return hasError;
      }; 

    saveChildDetails = () => {

        if(this.validateForm()){
            return;
        }

        AsyncStorage.getItem('userData')
          .then(data => {


            let profile_info = JSON.parse(data);
             // Contents from the state
            const { firstName, lastName, photo, height, weight, gender, blood_group, dob, address, emergency_contact, allergies } = this.state;

            let date_string = dob.toLocaleDateString();
            let date_values = date_string.split('/');
            console.log(date_values);
            // Create JSON object
            const childDetails = { 
                child_info: { 
                firstName: firstName, 
                lastName: lastName, 
                dateOfBirth: ""+date_values[2]+"-"+(parseInt(date_values[1])<10?"0":"")+date_values[1]+"-"+(parseInt(date_values[0])<10?"0":"")+date_values[0], 
                gender: gender, 
                parentsNames: profile_info['first_name']+" "+profile_info['last_name'], 
                parent_email: profile_info['parent_email'],
                address: address, 
                bloodGroup: blood_group, 
                emergencyContact: emergency_contact, 
                allergies: allergies
                }
            };



            this.setState({loading: true});
            // Calling the API to add children details
            axios.post("https://childcareapp.onrender.com/api/postChildInformation/", childDetails)
            .then(response => {
            this.setState({loading: false});
            if(response.data.message == "Child information posted successfully"){
                // Write continuation code here for successful record addition
                alert("Successfully added child");
                this.props.navigation.goBack() 
            }
            })
            .catch(err => {
            this.setState({loading: false});    
            //Deal with errors in API.
            console.error('Error adding child in db:', err);
            alert("An error has occured while adding the child.");
            });



          })
          .catch(error => {
            alert("Problem in getting user data")
            console.error('Error retrieving profile data:', err);
        });


    };

    handleDateChange = (date) => {
        this.setState({dob: date});
        this.handleShowCalendar();
    }
    handleFirstNameChange = (firstName) => {
        this.setState({ firstName });
    };
    
    // Handles the changes in the last name input field
    handleLastNameChange = (lastName) => {
        this.setState({ lastName });
    };


    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            console.log(result.assets[0].uri);
            this.setState({photo: result.assets[0].uri});
        }
      };
    
    
    
      

    
    // Handles the changes in the height input field
    handleHeightChange = (height) => {
      this.setState({ height });
    };

     // Handles the changes in the height input field
     handleWeightChange = (weight) => {
        this.setState({ weight });
    };

    // Handles the changes in the gender input field
    handleGenderChange = (gender) => {
        this.setState({ gender });
    };

    // Handles the changes in the blood group input field
    handleBloodGroupChange = (blood_group) => {
        this.setState({ blood_group });
    };

    // Handles the changes in the address input field
    handleAddressChange = (address) => {
        this.setState({ address });
    };

    // Handles the changes in the emergency contact input field
    handleEmergencyContactChange = (emergency_contact) => {
        this.setState({ emergency_contact });
    };

    // Handles the changes in the allergies input field
    handleAllergiesChange = (allergies) => {
        this.setState({ allergies });
    };


    handleDOBChange = (dob) => {
        this.setState({ dob });
    };

    
    
    render() {
        return (
            <View style={styles.container}>
            <ScrollView style={styles.form}>
            <Spinner
                visible={this.state.loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
              <Text>First Name</Text>
               {/* Input field for entering the first name */}  
              <TextInput 
              style={styles.input} 
              placeholder="First Name"
              value={this.state.firstName}
              onChangeText={this.handleFirstNameChange}
              />
              {this.state.errors.firstName && <Text style={styles.error}>{this.state.errors.firstName}</Text>}
              <Text>Last Name</Text>  
               {/* Input field for entering the last name */}
              <TextInput 
              style={styles.input} 
              placeholder="Last Name"
              value={this.state.lastName}
              onChangeText={this.handleLastNameChange}
              />
              {this.state.errors.lastName && <Text style={styles.error}>{this.state.errors.lastName}</Text>}

            <Button title="Pick an image from camera roll" onPress={this.pickImage} />
            {this.state.photo && <Image source={{ uri: this.state.photo }} style={{ width: 200, height: 200 }} />} 
            <Text>{"\n"}</Text>
              <Text>Height</Text>  
               {/* Input field for entering the parent email */}
              <TextInput 
              style={styles.input} 
              placeholder="Height in cm "
              value={this.state.height}
              onChangeText={this.handleHeightChange}
              />
              {this.state.errors.height && <Text style={styles.error}>{this.state.errors.height}</Text>}
              <Text>Weight</Text>  
               {/* Input field for entering the mobile number */}
              <TextInput 
              style={styles.input} 
              placeholder="Weight in pounds"
              value={this.state.weight}
              onChangeText={this.handleWeightChange}
              />
              {this.state.errors.weight && <Text style={styles.error}>{this.state.errors.weight}</Text>}
              <Text>Gender</Text>  
               {/* Input field for entering the gender */}
              <TextInput 
              style={styles.input} 
              placeholder="Gender"
              value={this.state.gender}
              onChangeText={this.handleGenderChange}
              />
              {this.state.errors.gender && <Text style={styles.error}>{this.state.errors.gender}</Text>}
              <Text>Blood Group</Text>  
               {/* Input field for entering the blood group */}
              <TextInput 
              style={styles.input} 
              placeholder="Blood Group"
              value={this.state.blood_group}
              onChangeText={this.handleBloodGroupChange}
              />
              {this.state.errors.blood_group && <Text style={styles.error}>{this.state.errors.blood_group}</Text>}
              <Text>Date of Birth</Text>  
              <TextInput 
              style={styles.input} 
              placeholder="Date of Birth"
              value={this.state.dob.toString()}
              onFocus={this.handleShowCalendar}
              />
              {this.state.errors.dob && <Text style={styles.error}>{this.state.errors.dob}</Text>}
              { this.state.showCalendar && <CalendarPicker
                onDateChange={(date) => this.handleDateChange(date)}
                />}

            <Text>Address</Text>  
               {/* Input field for entering the address */}
              <TextInput 
              style={styles.input} 
              placeholder="Address"
              value={this.state.address}
              onChangeText={this.handleAddressChange}
              />
              {this.state.errors.address && <Text style={styles.error}>{this.state.errors.address}</Text>}
              <Text>Emergency Contact</Text>  
               {/* Input field for entering the emergency contact */}
              <TextInput 
              style={styles.input} 
              placeholder="Emergency Contact"
              value={this.state.emergency_contact}
              onChangeText={this.handleEmergencyContactChange}
              />   
              {this.state.errors.emergency_contact && <Text style={styles.error}>{this.state.errors.emergency_contact}</Text>}
              <Text>Allergies</Text>  
               {/* Input field for entering the allergies */}
              <TextInput 
              style={styles.input} 
              placeholder="Allergies"
              value={this.state.allergies}
              onChangeText={this.handleAllergiesChange}
              />    
             
                {/* Register button */}
                <Button
                  title="Add Child"
                  onPress={this.saveChildDetails}
                />
                <Text>{"\n"}{"\n"}{"\n"}</Text>
                  
            </ScrollView>
            </View>
        )
    }
}

export default AddChild