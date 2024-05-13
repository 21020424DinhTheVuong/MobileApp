import { LineChart } from "react-native-chart-kit";
import { View, ScrollView, } from "react-native";

const MyLineChart = ({ data }) => {
    return (
        <View style={{ marginHorizontal: 20 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={{
                        labels: [
                            "0:00",
                            "1:00",
                            "2:00",
                            "3:00",
                            "4:00",
                            "5:00",
                            "6:00",
                            "7:00",
                            "8:00",
                            "9:00",
                            "10:00",
                            "11:00",
                            "12:00",
                            "13:00",
                            "14:00",
                            "15:00",
                            "16:00",
                            "17:00",
                            "18:00",
                            "19:00",
                            "20:00",
                            "21:00",
                            "22:00",
                            "23:00",
                        ],
                        datasets: [
                            {
                                data: data
                            },
                        ],
                    }}
                    width={1000} // from react-native
                    height={220}
                    //yAxisLabel="$"
                    //yAxisSuffix="k"
                    //yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: '#00BFFF',
                        backgroundGradientFrom: '#00BFFF',
                        backgroundGradientTo: '#00BFFF',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(28, 40, 51 , ${opacity})`,
                        propsForDots: {
                            r: "4",
                            strokeWidth: "2",
                            stroke: "#2ECC71",
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 6,
                        borderRadius: 16,
                    }}
                />
            </ScrollView>
        </View>
    );
};
export default MyLineChart