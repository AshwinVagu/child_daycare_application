// This is a mock for the logindata recieved by the function
const axios = {
    get: () => Promise.resolve({
      data: {
        first_name: "TestFirstName",
        last_name: "TestLastName",
        mobile_number: "1234567890",
        parent_email: "test@example.com"
      }
    })
  };
  
// This is a mock for the AsyncStorage existing in the application
const AsyncStorage = {
    setItem: () => Promise.resolve(),
    getItem: () => Promise.resolve(JSON.stringify({
      firstName: "StoredFirstName",
      lastName: "StoredLastName",
      phone: "0987654321",
      address: "stored@example.com"
    }))
  };

  module.exports = { axios, AsyncStorage };  