import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { navMenu } from "../models/navMenu";
import HomeScreen from "./HomeScreen";
import WeatherScreen from "./WeatherScreen";
import TemperatureScreen from "./TemperatureScreen";
import AdditionalInfoScreen from "./AdditionalInfoScreen";

const Tab = createBottomTabNavigator();

export default function MainScreen(props){
    console.log("MainScreen mounted")
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Weather" component={WeatherScreen} />
            <Tab.Screen name="Temperature" component={TemperatureScreen} />
            <Tab.Screen name="Additional info" component={AdditionalInfoScreen} />
        </Tab.Navigator>
    )
}