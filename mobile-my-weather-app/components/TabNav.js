import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WeatherScreen from '../screens/WeatherScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import AdditionalInfoScreen from '../screens/AdditionalInfoScreen';
import AboutScreen from '../screens/AboutScreen';
import { bottomTabs } from '../models/navMenu';

const Tab = createBottomTabNavigator();

export default function TabNav(){
    return(
        <Tab.Navigator>
            <Tab.Screen name={bottomTabs[0].label} component={HomeScreen} />
            <Tab.Screen name={bottomTabs[1].label} component={WeatherScreen} />
            <Tab.Screen name={bottomTabs[2].label} component={TemperatureScreen} />
            <Tab.Screen name={bottomTabs[3].label} component={AdditionalInfoScreen} />
            <Tab.Screen name={bottomTabs[5].label} component={AboutScreen} />
        </Tab.Navigator>
    )
}