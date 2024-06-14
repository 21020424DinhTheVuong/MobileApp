import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import { fetchWeatherForecast, fetchLocations } from '../api/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon, TrashIcon } from 'react-native-heroicons/outline';
// import { listAddLocations } from '../constant/listLocation';

function AddLocationScreen({ navigation }) {
    const route = useRoute();
    const [loading, setLoading] = useState(false);

    const [list, setList] = useState();
    const getList = async () => {

        try {
            const listAdd = await AsyncStorage.getItem("list");
            const array = JSON.parse(listAdd);
            setList(array)
            // console.log("list", listAdd)
            setLoading(false)
        } catch (error) {
            console.log('Error get array:', error);
        }
    }
    useEffect(() => {
        getList()
    }, [list])

    const deleteLocation = async (city, location) => {
        try {
            let listTemp = list.filter(item => !(item.location === location && item.city === city))
            // await AsyncStorage.clear();
            const jsonValue = JSON.stringify(listTemp);
            await AsyncStorage.setItem("list", jsonValue);
            console.log('Array delete successfully');
        } catch (error) {
            console.log('Error delete array:', error);
        }
        setList(prevList => prevList.filter(item => !(item.location === location && item.city === city)));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={require("../assets/bg3.jpg")}
                style={styles.backgroundImage}
                blurRadius={70}
            />

            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ top: 50 }}>

                    <View style={styles.locationContainer}>
                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                                <ArrowLeftIcon size={30} color={"white"} />

                            </TouchableOpacity>
                        </View>
                        {
                            loading ? (
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                    <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
                                </View>
                            ) : (
                                <ScrollView
                                    showsVerticalScrollIndicator={false}>

                                    {
                                        list?.map((item, index) => {
                                            return (
                                                <View style={{ display: "flex", flexDirection: "row" }} key={index}>
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => { navigation.navigate("Detail", { city: item?.city }) }}
                                                        style={{ flex: 1, width: "86%" }}>
                                                        <View>
                                                            <Image source={require("../assets/backgroundchildren1.webp")} blurRadius={50}
                                                                style={styles.background} />
                                                            <Text
                                                                style={[styles.itemLocation, { fontSize: 20 }]}>
                                                                {item?.city + " - " + item?.location + "   "}
                                                                {/* <Image source={require("../assets/day/Cloudy.png")} style={{ width: 40, height: 40 }} /> */}
                                                            </Text>

                                                        </View>

                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => { deleteLocation(item?.city, item?.location); }}
                                                        key={index.toString() + index}
                                                        style={{ marginTop: 30, marginLeft: 10 }}
                                                    >
                                                        <TrashIcon size={40} color={"red"} />
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            )
                        }

                    </View>



                </SafeAreaView>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        relative: true, // Assuming this is needed for specific layout

    },
    backgroundImage: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    background: {
        width: "100%",
        height: 80,
        position: "absolute",
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    locationContainer: {
        marginHorizontal: 15
    },
    itemLocation: {
        height: 80,
        color: "white",
        paddingLeft: 10,
        paddingTop: 5,
        marginHorizontal: 10,
        marginTop: 30,
    }
})
export default AddLocationScreen