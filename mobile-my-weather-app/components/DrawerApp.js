import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import WeatherScreen from '../screens/WeatherScreen';
import HomeScreen from '../screens/Homescreen';
import AdditionalInfoScreen from '../screens/AdditionalInfoScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { navMenu } from '../models/navMenu';

const Drawer = createDrawerNavigator();

export default function DrawerApp(){
    return(
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen 
                component={HomeScreen}
                name={navMenu[0].label}
                options={{ drawerIcon: () => navMenu[0].icon }}
            />
            <Drawer.Screen
                component={WeatherScreen}
                name={navMenu[1].label}
                options={{ drawerIcon: () => navMenu[1].icon }}
            />   
            <Drawer.Screen
                component={TemperatureScreen}
                name={navMenu[2].label}
                options={{ drawerIcon: () => navMenu[2].icon }}
            />
            <Drawer.Screen
                component={AdditionalInfoScreen}
                name={navMenu[3].label}
                options={{ drawerIcon: () => navMenu[3].icon }}
            />   
            <Drawer.Screen
                component={AboutScreen}
                name={navMenu[5].label}
                options={{ drawerIcon: () => navMenu[5].icon }}
            />   
        </Drawer.Navigator>
    )
}