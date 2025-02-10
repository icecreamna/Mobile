import React from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./src/screens/Homescreen";
import Timescreen from "./src/screens/Timescreen";
import GPT from "./src/screens/GPT";

const Stack = createStackNavigator()


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Homescreen}
                    options={{ title: 'Home | List of Screen' }}
                />
                 <Stack.Screen
                    name="Time"
                    component={Timescreen}
                    options={{ title: 'Home | Time of Screen' }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}


export default App