import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WeatherScreen from '../screens/WeatherScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import AdditionalInfoScreen from '../screens/AdditionalInfoScreen';

const Tab = createBottomTabNavigator();

export default function TabNav(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Weather" component={WeatherScreen} />
            <Tab.Screen name="Temperature" component={TemperatureScreen} />
            <Tab.Screen name="Additional info" component={AdditionalInfoScreen} options={{ title: "" }} />
        </Tab.Navigator>
    )
}