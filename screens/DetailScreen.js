import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useRoute } from '@react-navigation/native';
import MyLineChart from './Chart';


function DetailScreen({ navigation }) {
    const route = useRoute()
    const currentWeather = route.params?.currentWeather;
    const timeTemp = route.params?.time;
    // console.log(route.params?.currentWeather)
    const aqiTemp = route.params?.aqi;
    // console.log(route.params?.aqi);
    const [aqiValues, setAqiValue] = useState({})
    const pollutantKeys = ["co", "so2", "no2", "o3", "pm2_5", "pm10"];
    const [pollutantNames, setPollutantNames] = useState([]);
    const [pollutantValues, setPollutantValues] = useState([]);

    useEffect(() => {
        const filteredAqiTemp = { ...aqiTemp }; // Create a copy to avoid mutation
        delete filteredAqiTemp["gb-defra-index"];
        delete filteredAqiTemp["us-epa-index"];
        setAqiValue(filteredAqiTemp)
        const filteredPollutantNames = pollutantKeys.filter((key) => key in aqiValues); // Filter valid keys
        const filteredPollutantValues = filteredPollutantNames.map((key) => aqiValues[key]);

        setPollutantNames(filteredPollutantNames);
        setPollutantValues(filteredPollutantValues);
    }, [])

    // console.log(aqiValues)
    const aqiChange = Object.entries(aqiValues)
    const aqiIndex = aqiTemp["us-epa-index"];
    const aqiValue = ['Good', "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"]
    const unit = "(μg/m3)"

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
                    <View style={{ marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                            <ArrowLeftIcon size={30} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>

                        <Text style={{ fontSize: 20, color: "white", marginLeft: 20, marginTop: 20 }}>Weather</Text>
                        <View style={styles.detailContainerStyle}>
                            <View style={styles.detailStyle}>
                                <Text style={styles.detailTextStyle}>Wind</Text>
                                <Text style={styles.detailTextStyle}>{currentWeather[0]}km/h</Text>
                            </View>
                            <View style={styles.detailStyle}>
                                <Text style={styles.detailTextStyle}>Humidity</Text>
                                <Text style={styles.detailTextStyle}>{currentWeather[1]}%</Text>
                            </View>
                            <View style={styles.detailStyle}>
                                <Text style={styles.detailTextStyle}>Temperature</Text>
                                <Text style={styles.detailTextStyle}>{currentWeather[2]}&#176;</Text>
                            </View>
                            <View style={styles.detailStyle}>
                                <Text style={styles.detailTextStyle}>Feels like</Text>
                                <Text style={styles.detailTextStyle}>{currentWeather[3]}&#176;</Text>
                            </View>
                            <View style={styles.detailStyle}>
                                <Text style={styles.detailTextStyle}>Sunrise</Text>
                                <Text style={styles.detailTextStyle}>{currentWeather[4]}</Text>
                            </View>
                            <View style={styles.detailStyle}>
                                <Text style={styles.detailTextStyle}>Sunset</Text>
                                <Text style={styles.detailTextStyle}>{currentWeather[5]}</Text>
                            </View>

                        </View>

                        <Text style={{ fontSize: 20, color: "white", marginLeft: 20, marginTop: 20 }}>Air Quality Index {unit}</Text>
                        <View style={styles.detailContainerStyle}>
                            <TouchableOpacity onPress={toggleModal}>
                                {aqiChange.map(([key, value]) => (
                                    <View key={key} style={styles.detailStyle}>
                                        <Text style={[styles.detailTextStyle, { textTransform: "uppercase" }]}>{key}</Text>
                                        <Text style={styles.detailTextStyle}>{value}</Text>
                                    </View>
                                ))}

                                <View style={styles.detailStyle}>
                                    <Text style={styles.detailTextStyle}>AQI</Text>
                                    {isModalVisible ?
                                        <Text style={[styles.detailTextStyle, { fontSize: 16, marginTop: 3 }]}>{aqiValue[aqiIndex - 1]}</Text>
                                        : <Text style={styles.detailTextStyle}>{aqiIndex} </Text>

                                    }

                                </View>
                            </TouchableOpacity>

                        </View>
                        <Text style={{ fontSize: 20, color: "white", marginLeft: 20, marginTop: 20 }}>Temperature Chart</Text>

                        <View>

                            <MyLineChart data={timeTemp} />

                        </View>

                        <View style={{ height: 100 }}></View>
                    </ScrollView>

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
    detailContainerStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        // marginTop: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        backgroundColor: "#00BFFF"
    },
    detailStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderWidth: 1,
        // borderColor: "transparent",
        borderBottomColor: "grey",
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent"
    },
    detailTextStyle: {
        color: "white",
        fontSize: 20,
        marginBottom: 5,

    },

})
export default DetailScreen