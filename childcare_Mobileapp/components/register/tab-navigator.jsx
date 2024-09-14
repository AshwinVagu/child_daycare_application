import React, {Component} from "react";
import Home from './home'; // Importing Home component
import Profile from './profile'; // Importing Profile component
import AddChild from './add-child';
import ViewChildDetails from './view-child-details';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class TabNavigator extends Component {
    render() {
        const { navigation } = this.props;
        const Tab = createBottomTabNavigator();
        return (
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="home" size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Add Child" 
                    component={AddChild} 
                    options={{
                        tabBarLabel: 'Add Child',
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="plus" size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Children Details" 
                    component={ViewChildDetails} 
                    options={{
                        tabBarLabel: 'Children Details',
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="file" size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile} 
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="face-man-profile" size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default TabNavigator