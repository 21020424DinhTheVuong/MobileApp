
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme'; // Assuming theme is imported correctly
import { ArrowLeftIcon, CalendarDaysIcon } from "react-native-heroicons/outline"
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImage, weatherImageNight } from '../constant';
import * as Location from "expo-location";
import * as Progress from "react-native-progress";

const DetailAddLocationScreen = ({ navigation }) => {
    const route = useRoute();
    const address = route.params.city;
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchMyWeatherData = async () => {
        fetchWeatherForecast({
            cityName: address,
            days: '7'
        }).then(data => {
            setWeather(data);
            // console.log(weather)
            setLoading(false);
        })
    }
    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const { current, location } = weather;
    const time = [Math.round(weather?.forecast?.forecastday[0]?.hour[0].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[1].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[2].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[3].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[4].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[5].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[6].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[7].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[8].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[9].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[10].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[11].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[12].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[13].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[14].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[15].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[16].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[17].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[18].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[19].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[20].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[21].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[22].temp_c),
    Math.round(weather?.forecast?.forecastday[0]?.hour[23].temp_c),]
    const currentTransfer = [current?.wind_kph, current?.humidity, Math.round(current?.temp_c), Math.round(current?.feelslike_c),
    weather?.forecast?.forecastday[0]?.astro?.sunrise, weather?.forecast?.forecastday[0]?.astro?.sunset]
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={require("../assets/bg3.jpg")}
                style={styles.backgroundImage}
                blurRadius={70}
            />

            {loading ? (
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                    <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
                </View>
            ) : (

                <SafeAreaView style={styles.safeArea}>

                    <View style={[styles.searchBarContainer]}>

                        <View style={{ marginLeft: 10, top: 30 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("AddLocationScreen") }}>
                                <ArrowLeftIcon size={30} color={"white"} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 4, display: "flex", justifyContent: "space-around", top: 100, }}>
                            <View style={{ alignItems: "center", justifyContent: "center", }}>
                                <Text style={{ color: "white", textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
                                    {location?.name} - {' '}
                                    <Text style={{ fontSize: 20, fontWeight: 600, color: "#C2C2C2", textAlign: 'center' }}>
                                        {location?.country}
                                    </Text>
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 80 }}>
                                <Image
                                    source={current?.is_day ? weatherImage[current?.condition?.text] : weatherImageNight[current?.condition?.text]}
                                    style={{ width: 130, height: 130 }} />
                            </View>

                            <View style={{ top: 200 }}>
                                <Text style={{ textAlign: "center", fontWeight: "bold", color: "white", fontSize: 35, marginLeft: 5 }}>
                                    {current?.temp_c}&#176;
                                </Text>
                                <Text style={{ textAlign: "center", color: "white", fontSize: 20, letterSpacing: 0.5 }}>
                                    {current?.condition?.text}

                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 4, top: 260, }}>
                                <View style={{ flexDirection: "row", paddingHorizontal: 2, alignItems: "center" }}>
                                    <Image source={require("../assets/winds.png")} style={{ width: 16, height: 16 }} />
                                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                                        {current?.wind_kph}km/h
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: 2, alignItems: "center" }}>
                                    <Image source={require("../assets/drop.png")} style={{ width: 16, height: 16 }} />
                                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                                        {current?.humidity}%
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: 2, alignItems: "center" }}>
                                    <Image source={require("../assets/sunrise.png")} style={{ width: 16, height: 16 }} />
                                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                                        {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 4, top: 300 }}>
                                <View style={{ flexDirection: "row", paddingHorizontal: 2, alignItems: "center" }}>
                                    <Image source={require("../assets/rays.png")} style={{ width: 16, height: 16 }} />
                                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                                        {current?.uv}
                                        {current?.uv <= 2 ?
                                            " (Good)" :
                                            current?.uv <= 5 ?
                                                " (Normal)" : " (Harm)"
                                        }
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: 2, alignItems: "center" }}>
                                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                                        {location?.localtime}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: 2, alignItems: "center" }}>
                                    <Image source={require("../assets/sunset.png")} style={{ width: 16, height: 16 }} />
                                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                                        {weather?.forecast?.forecastday[0]?.astro?.sunset}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate("DetailScreen", { aqi: current?.air_quality, currentWeather: currentTransfer, time: time }) }}>
                                <View style={styles.detailButtonStyles}>
                                    <Text style={{ color: "white", fontSize: 20 }}>Weather Detail</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/**Dailt forecast */}
                    <View style={{ marginBottom: 2, paddingVertical: 3, top: 500 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5, paddingHorizontal: 10, marginBottom: 20 }}>
                            <CalendarDaysIcon size={22} color="white" />
                            <Text style={{ color: "white", fontSize: 16 }}>Daily forecast</Text>
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {weather?.forecast?.forecastday?.map((item, index) => {
                                let date = new Date(item.date);
                                let options = { weekday: "long" };
                                let dayName = date.toLocaleDateString("en-US", options);
                                let today = "Now";
                                dayName = dayName.split(',')[0]
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            display: "flex", justifyContent: "center", alignItems: "center",
                                            width: 80, borderRadius: 15, paddingVertical: 3, marginRight: 4, backgroundColor: theme.bgWhite(0.15)
                                        }}>
                                        {index == 0 ? (
                                            <Image source={current?.is_day ? weatherImage[current?.condition?.text] : weatherImageNight[current?.condition?.text]} style={{ width: 50, height: 50 }} />
                                        ) : (
                                            <Image source={weatherImage[item?.day?.condition?.text]} style={{ width: 50, height: 50 }} />
                                        )
                                        }
                                        {index == 0 ? (
                                            <Text style={{ color: "white" }}>{today}</Text>
                                        ) : (
                                            <Text style={{ color: "white" }}>{dayName}</Text>
                                        )
                                        }
                                        {index == 0 ? (
                                            <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>{current?.temp_c}&#176;</Text>
                                        ) : (
                                            <View>
                                                <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>{Math.round(item?.day?.maxtemp_c.toString())}&#176;</Text>
                                                <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>{Math.round(item?.day?.mintemp_c.toString())}&#176;</Text>

                                            </View>
                                        )
                                        }
                                    </View>
                                )
                            })}


                        </ScrollView>
                    </View>
                </SafeAreaView>

            )
            }
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        relative: true, // Assuming this is needed for specific layout
        paddingTop: StatusBar.height,

    },
    backgroundImage: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    safeArea: {
        flex: 1,
        flexDirection: 'column', // Set flex direction (optional)
    },
    searchBarContainer: {
        height: '7%',
        marginHorizontal: 16,
        marginVertical: "7%",
        relative: true,
        zIndex: 50,
    },
    searchInput: {
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 40,
    },
    textInput: {
        paddingLeft: 16,
        paddingBottom: 1,
        height: 50,
        flex: 1,
        fontSize: 16,
        color: 'white',
    },
    iconSearch: {
        backgroundColor: theme.bgWhite(0.3),
        borderRadius: 50,
        padding: 3,
        margin: 1,
    },
    stylelocations: {
        position: "absolute",
        width: "100%",
        backgroundColor: "#f2f2f2",
        top: 50,
        borderRadius: 10,
        zIndex: 30,
    },
    locationsList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        borderWidth: 0,
        padding: 3,
        paddingHorizontal: 4,
        marginBottom: 1,

    },
    locationsListBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#d4d7dc'
    },
    detailButtonStyles: {
        top: 350,
        borderWidth: 1,
        borderColor: "grey",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#008080"
    }
});

export default DetailAddLocationScreen;
