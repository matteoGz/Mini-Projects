import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { navMenu } from "../models/navMenu";
import HomeScreen from "./HomeScreen";
import WeatherScreen from "./WeatherScreen";
import TemperatureScreen from "./TemperatureScreen";
import AdditionalInfoScreen from "./AdditionalInfoScreen";

const Tab = createBottomTabNavigator();

export default function MainScreen(){
    console.log("MainScreen mounted")
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => navMenu[0].icon }} />
            <Tab.Screen name="Weather" component={WeatherScreen} options={{ tabBarIcon: () => navMenu[1].icon }} />
            <Tab.Screen name="Temperature" component={TemperatureScreen} options={{ tabBarIcon: () => navMenu[2].icon }} />
            <Tab.Screen name="Additional info" component={AdditionalInfoScreen} options={{ tabBarIcon: () => navMenu[3].icon }} />
        </Tab.Navigator>
    )
}