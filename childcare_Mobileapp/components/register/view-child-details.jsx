import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Button, Alert } from "react-native";
import { Card } from 'react-native-elements';
import { styles } from '../register/register-style';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

export default class ViewChildDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadChildIdAndFetchDetails();
  }
  componentDidUpdate() {
    this.loadChildIdAndFetchDetails();
  }


  loadChildIdAndFetchDetails = async () => {
    try {
      // Retrieve the child ID from AsyncStorage
      const userDataJson = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataJson);

      if (userData && userData.id) {
        this.fetchChildrenDetails(userData.id);
      } else {
        // Handle case where no child_id is available
        throw new Error("No child ID available");
      }
    } catch (error) {
      // Handle errors in fetching from AsyncStorage or parsing JSON
      this.setState({ error, isLoading: false });
      Alert.alert("Error", "Failed to load user data");
    }
  }

  fetchChildrenDetails = (childId) => {
    fetch(`https://childcareapp.onrender.com/api/getChildInformation?id=${childId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as needed, for example, an authorization token
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => this.setState({ users: data, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
  }

    handlePressChild = (child) => {
    // Navigate to EditChildDetails screen with child details
    this.props.navigation.navigate('EditChildDetails', { child });
  }


  render() {
    const { users, isLoading, error } = this.state;

    return (
      <ScrollView style={styles.scroll_container}>
        <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
        {users.map((u, i) => (
          <Card key={i}>
            <Card.Title>Name: {u.first_name} {u.last_name}</Card.Title>
            <View>
              <Text>{"\n"}<Text style={{fontWeight: "bold"}}>Parents Names:</Text> {u.parents_names}</Text>
              <Text><Text style={{fontWeight: "bold"}}>Date of Birth:</Text> {u.date_of_birth}</Text>
              <Text><Text style={{fontWeight: "bold"}}>Blood Group:</Text> {u.blood_group}</Text>
              <Text><Text style={{fontWeight: "bold"}}>Gender:</Text> {u.gender}</Text>
            </View>
            <Text>{"\n"}</Text>
            <Button title="Edit" onPress={() => this.handlePressChild(u)} />
          </Card>
        ))}
        <Text>{"\n"}</Text>
      </ScrollView>
    );
  }
}

