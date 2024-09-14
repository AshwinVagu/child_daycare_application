const axios = require('axios');
const AsyncStorage = require('@react-native-async-storage/async-storage');

// This is the mock function used to retireve the user details
async function fetchAndStoreProfileData(loginData, setProfileData) {
  try {
    const response = await axios.get(`https://childcareapp.onrender.com/api/getRegisteredUser?email=${loginData.username}`);
    const profileInfo = {
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      phone: response.data.mobile_number,
      address: response.data.parent_email
    };
    // Adding the retrieved data into the AsyncStorage of the application
    await AsyncStorage.setItem('profileData', JSON.stringify(profileInfo));
    setProfileData(profileInfo);
  } catch (err) {
    console.error('Error retrieving or setting profile data:', err);
    
  }
}

module.exports = { fetchAndStoreProfileData };
