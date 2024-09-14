// Register Component --> This component provides a register form for users to enter their details and register the user.
// Importing the necessary modules from React and React Native libraries
import React from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from '../register/register-style';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
 
// The below object is the data that will be used in the dropdown.
Dropdown_data = [
    {label:"Employee", value:"Employee"},
    {label:"Guardian", value:"Guardian"}
]

export default class Register extends React.Component { 
  // State to manage the firstname, lastname, parentEmail, mobile, passwords and role entered by the user
  state = {
    firstName: '',
    lastName: '',
    parentEmail: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    role:'',
    loading: false,
    errors: {}
};

// Handles the changes in the first name input field
handleFirstNameChange = (firstName) => {
    this.setState({ firstName });
};

// Handles the changes in the last name input field
handleLastNameChange = (lastName) => {
    this.setState({ lastName });
};

// Handles the changes in the parent email input field
handleParentEmailChange = (parentEmail) => {
  this.setState({ parentEmail });
};

// Handles the changes in the mobile number input field
handleMobileNumberChange = (mobileNumber) => {
  this.setState({ mobileNumber });
};

// Handles the changes in the password input field
handlePasswordChange = (password) => {
  this.setState({ password });
};

// Handles the changes in the confirm password input field
handleConfirmPasswordChange = (confirmPassword) => {
  this.setState({ confirmPassword });
};

// Handles the changes in the role input field
handleRoleChange = (role) => {
  this.setState({ role });
};

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

  // Validate email field 
  if (!this.state.parentEmail) { 
    errors.parentEmail = 'Email is required.'
    hasError = true;
  } else if (!/\S+@\S+\.\S+/.test(this.state.parentEmail)) { 
      errors.parentEmail = 'Email is invalid.'
      hasError = true;
  } 

  // Validate mobileNumber field 
  if (!this.state.mobileNumber) { 
    errors.mobileNumber = 'Mobile is required.'
    hasError = true;
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.state.mobileNumber)) { 
      errors.mobileNumber = 'Mobile is invalid.'
      hasError = true;
  } 

  // Validate password field 
  if (!this.state.password) { 
    errors.password = 'Password is required.'
    hasError = true;
  } 

  // Validate confirm password field 
  if (!this.state.confirmPassword) { 
    errors.confirmPassword = 'Confirm password is required.'
    hasError = true;
  } else if (this.state.confirmPassword != this.state.password) { 
    errors.confirmPassword = 'Passwords must match'
    hasError = true;
  }  

  // Validate role field 
  if (!this.state.role) { 
    errors.role = 'Role is required.'
    hasError = true;
  } 

  // Set the errors and update form validity 
  this.setState({errors})
  return hasError;
}; 

// Handles the register process ---> Returns the register data object containing user details.
handleRegister = () => {
    
    if(this.validateForm()){
      return;
    }

    // Add your register logic here
    const { firstName, lastName, parentEmail, mobileNumber, password, confirmPassword, role } = this.state;
    // Create JSON object
    const registerData = {
      registration: {
        studentName: {
          firstName: firstName,
          lastName: lastName
        },
        parentEmail: parentEmail,
        mobileNumber: mobileNumber,
        password: password,
        confirmPassword: confirmPassword,
        role: role.value 
      }
    };
    this.setState({loading: true});
    axios.post("https://childcareapp.onrender.com/api/register/", registerData)
        .then(response => {
          alert("User registered successfully")
          this.setState({loading: false});
          if (response.data.message == "User registered successfully"){
            console.log("User registered successfully")
          }
          else {
            alert("Not registered succesfully")
          }
        })
        .catch(err => {
          this.setState({loading: false});
          console.log("An error has occured - "+error);
          alert("Not registered succesfully")
        });

    this.props.navigation.navigate('Login');    
    //clearing fields in registration
    this.setState({ firstName: '', lastName: '', parentEmail: '', mobileNumber: '', password: '', confirmPassword: '', role:''});
    // Returns the required JSON object required for resistering.
    return registerData;
};
    
    render() { 
      // Extracting the navigation prop from the props object using destructuring
      const { navigation } = this.props;
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
              <Text>Parent Email</Text>  
               {/* Input field for entering the parent email */}
              <TextInput 
              style={styles.input} 
              placeholder="Parent Email"
              value={this.state.parentEmail}
              onChangeText={this.handleParentEmailChange}
              />
              {this.state.errors.parentEmail && <Text style={styles.error}>{this.state.errors.parentEmail}</Text>}
              <Text>Mobile Number</Text>  
               {/* Input field for entering the mobile number */}
              <TextInput 
              style={styles.input} 
              placeholder="Mobile Number"
              value={this.state.mobileNumber}
              onChangeText={this.handleMobileNumberChange}
              />
              {this.state.errors.mobileNumber && <Text style={styles.error}>{this.state.errors.mobileNumber}</Text>}
              <Text>Password</Text>  
               {/* Input field for entering the password */}
              <TextInput 
              style={styles.input} 
              placeholder="Password" 
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              secureTextEntry
              />
              {this.state.errors.password && <Text style={styles.error}>{this.state.errors.password}</Text>}
              <Text>Confirm Password</Text> 
               {/* Input field for entering the the confirmed password */} 
              <TextInput 
              style={styles.input} 
              placeholder="Confirm Password" 
              value={this.state.confirmPassword}
              onChangeText={this.handleConfirmPasswordChange}
              secureTextEntry
              />
              {this.state.errors.confirmPassword && <Text style={styles.error}>{this.state.errors.confirmPassword}</Text>}
              <Text>Role</Text>  
               {/* Dropdown field for entering the role details */}
              <Dropdown
                style={[styles.dropdown && { borderColor: 'black', borderWidth: 1, paddingLeft: 10, paddingRight: 10 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={Dropdown_data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder='Select item'
                searchPlaceholder="Search..."
                value={this.state.role}
                onChange={this.handleRoleChange}
                />
                {this.state.errors.role && <Text style={styles.error}>{this.state.errors.role}</Text>}
                {/* Register button */}
                <Button
                  title="Register"
                  onPress={() => {
                      const registerData = this.handleRegister();
                      //console.log('Register Data:', registerData);
                  }}
                />
                 <Text>{"\n"}</Text>
                {/* Button that navigates to login page */}
                <Button
                  title="Already Registered? Login in here!"
                  onPress={() => navigation.navigate('Login')}
                />    
            </ScrollView>
            </View>
        );
    }
  }