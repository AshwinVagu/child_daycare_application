// Import necessary modules
// Importing the necessary modules
import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { styles } from '../register/register-style';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

// Define the Login component
export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false,
    errors: {}
  };

  // Event handler for username change
  handleEmailChange = (username) => {
    this.setState({ username });
  };

  // Event handler for password change
  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  validateForm = () => { 
    let errors = {}; 
    let hasError = false;

    // Validate username field 
    if (!this.state.username) { 
      errors.email = 'Email is required.'
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(this.state.username)) { 
        errors.email = 'Email is invalid.'
        hasError = true;
    } 

    // Validate password field 
    if (!this.state.password) { 
        errors.password = 'Password is required.'
        hasError = true;
    }

    // Set the errors and update form validity 
    this.setState({errors})
    return hasError;
  }; 

  // Event handler for login button press
  handleLogin = () => {
    const { username, password } = this.state;

    // Payload for Login API
    loginDetails = {
        login: {
            parentEmail: username,
            password: password
        }
    }

    if(this.validateForm()){
      return;
    }
  
    this.setState({loading: true});
    // Logging in the user using appropriate credentials
    axios.post("https://childcareapp.onrender.com/api/login/", loginDetails)
        .then(response => {
          this.setState({loading: false});
          console.log(response.data);
          if(response.data.message == "Login successful"){
            // Create JSON object containing login data
            const loginData = {
              username: username,
              password: password
            };
            AsyncStorage.setItem('loginData', JSON.stringify(loginData))
            .then(() => {

              this.setState({loading: true});
              axios.get(`https://childcareapp.onrender.com/api/getRegisteredUser?email=${username}`)
              .then(response => {
                this.setState({loading: false});
                const { first_name, last_name, mobile_number, parent_email, id} = response.data; // Assume address is now included
                console.log(response, "response of user")
                AsyncStorage.setItem('userData', JSON.stringify(response.data))

                // Redirect to the profile page upon successful login
                this.props.navigation.navigate('TabNavigator');
            
              })
              .catch(error => {
                this.setState({loading: false});
                console.error('Error fetching profile data:', error);
                Alert.alert("Error", "Failed to retrieve profile data.");
              });

              
            })
            .catch(error => {
              alert("Not logged in succesfully");
              console.error('Error updating login data:', error);
          });
            
          }
          else{
             //Deal with a mistyped password or username.
              alert("Invalid username or password");
          }
        })
        .catch(err => {
          this.setState({loading: false});
          //Deal with errors in API.
          alert("An error has occured.");
        });


        axios.get(`https://childcareapp.onrender.com/api/getRegisteredUser?email=${username}`)
        .then(response => {
          const { first_name, last_name, mobile_number, parent_email, id} = response.data; // Assume address is now included
          console.log(response, "response of user")
          AsyncStorage.setItem('userData', JSON.stringify(response.data))

       
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
          Alert.alert("Error", "Failed to retrieve profile data.");
        });

    
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
        <View style={styles.form}>
          <Text>Username</Text>
          {/* Input field for entering the username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={this.state.username}
            onChangeText={this.handleEmailChange}
            keyboardType="email-address"
          />
          {this.state.errors.email && <Text style={styles.error}>{this.state.errors.email}</Text>}
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
          {/* Login button */}
          <Button
            title="Login"
            onPress={this.handleLogin}
          />
        </View>
      </View>
    );
  }
}