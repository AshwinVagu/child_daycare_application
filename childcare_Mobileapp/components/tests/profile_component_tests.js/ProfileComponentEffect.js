
const { fetchAndStoreProfileData } = require('./profile_test');
const {axios, AsyncStorage} = require('./mocks')

const loginData = { username: "test@example.com" };
// Null in the place of state setting function
const setProfileData = null; 

// Injecting mocks
fetchAndStoreProfileData(loginData, setProfileData, axios, AsyncStorage)
  .then(() => console.log('Test completed'))
  .catch((error) => console.error('Test failed', error));
