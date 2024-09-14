import React, {useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { styles } from '../register/register-style';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, ListItem } from 'react-native-elements';


export default function Home() {

      const [state, setState] = useState({
        schedule: []
      });
    const [childList, setchildList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchChildDetails = async ()  => {
            
            // Retrieve the ID from AsyncStorage
            const userDataJson = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(userDataJson);
            axios.get(`https://childcareapp.onrender.com/api/getChildInformation?id=${userData.id}`, {
                method: 'GET',
                headers:{
                  'Content-Type': 'application/json',
                  // Include other headers as needed, for example, an authorization token
                }
              })
              .then(response => {
                if (response.data) {
                  let childDets =  response.data;
                  let ids = [];
                  childDets.map((child) => ids.push(child.child_id))
                  AsyncStorage.setItem('childIds', JSON.stringify(ids))
                  setchildList(ids);
                  fetchChildrenSchedule();
                  
                }
                else{
                    throw new Error('Network response was not ok.');
                }

              })
              .catch(error => {
                this.setState({ error, isLoading: false });
              });;
            
        };

        const fetchChildSchedule = async (id)  => {
            
            const payload = {"child_id": id};
            const data = await axios.post(`https://childcareapp.onrender.com/api/getChildSchedule/`, payload);
            return data.data;
        };
        const fetchChildrenSchedule = async () => {

                try {
                    const promises = childList.map((child) => fetchChildSchedule(child));
                    const childrenScheduleDataPromise = await Promise.all(promises);
                    setState({schedule: childrenScheduleDataPromise});
                    setLoading(false);
                    console.log(childrenScheduleDataPromise);
                } catch (error) {
                    console.error("Error fetching child schedule:", error);
                }

        };

        fetchChildDetails();
        
    }, [childList]);

    
    return (
       <ScrollView style={styles.scroll_container}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

             {state.schedule.map((u, i) => {
                
                    return (
                        <Card key={i} >
                            <Card.Title>{u.child_info.child_name.first_name}  {u.child_info.child_name.last_name}</Card.Title>
                            <Card.Divider /> 
                            
                                {
                                     u.child_info.week_schedule.map((l, x) => {
                                        return (
                                            <ListItem key={x} bottomDivider>
                                            <ListItem.Content>
                                                <ListItem.Title style={styles.list_title}>{l.day}</ListItem.Title>
                                                <ListItem.Subtitle><Text style={styles.list_content_title}>Morning: </Text> {l.morning_activity}</ListItem.Subtitle>
                                                <ListItem.Subtitle><Text style={styles.list_content_title}>Afternoon: </Text> {l.afternoon_activity}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                        )
                                     })
                                }

                        </Card>
                    );
            })}

            <Text>{"\n"}</Text>

        </ScrollView>
    );
   
}
