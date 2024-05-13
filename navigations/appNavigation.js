import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import AddLocationScreen from '../screens/AddLocationScreen'
import DetailAddLocationScreen from '../screens/DetailAddLocationScreen'
import DetailScreen from '../screens/DetailScreen'
import * as Location from "expo-location"

const Stack = createNativeStackNavigator();


function appNavigation() {
    const [address, setAddress] = useState("Ha Noi")

    const getPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Please granted location permission")
            return;
        }
        try {
            let tempLocation = await Location.getCurrentPositionAsync({});
            const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
                longitude: tempLocation.coords.longitude,
                latitude: tempLocation.coords.latitude,
            });

            setAddress(reverseGeocodeAddress[0].region);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPermission();
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    initialParams={{ paramLocation: address }}
                    options={{ headerShown: false }}
                    component={HomeScreen} />
                <Stack.Screen
                    name="AddLocationScreen"
                    options={{ headerShown: false }}
                    component={AddLocationScreen} />
                <Stack.Screen
                    name="Detail"
                    options={{ headerShown: false }}
                    component={DetailAddLocationScreen} />
                <Stack.Screen
                    name="DetailScreen"
                    options={{ headerShown: false }}
                    component={DetailScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default appNavigation