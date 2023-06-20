import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WeatherScreen from '../screens/WeatherScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import AdditionalInfoScreen from '../screens/AdditionalInfoScreen';
import AboutScreen from '../screens/AboutScreen';
import { navMenu } from '../models/navMenu';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TabNav(){
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName={navMenu[0].label} screenOptions={{ headerShown: false }}>
                <Tab.Screen name={navMenu[0].label} component={HomeScreen} />
                <Tab.Screen name={navMenu[1].label} component={WeatherScreen} />
                <Tab.Screen name={navMenu[2].label} component={TemperatureScreen} />
                <Tab.Screen name={navMenu[3].label} component={AdditionalInfoScreen} />
                <Tab.Screen name={navMenu[5].label} component={AboutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}