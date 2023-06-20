import { Button } from "native-base";
import Content from "../components/Content";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { navMenu } from "../models/navMenu";
import WeatherScreen from "./WeatherScreen";
import TemperatureScreen from "./TemperatureScreen";
import AdditionalInfoScreen from "./AdditionalInfoScreen";
import AboutScreen from "./AboutScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

export default function HomeScreen({ navigation }){
    console.log("Home screen...")
    return(
        <>
            <Drawer.Navigator
                useLegacyImplementation
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >  
                <Drawer.Screen 
                    component={()=> HomeScreen}
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
            <Content/>
            <Button   
                onPress={()=> navigation.navigate('About')}
            >
                Go to about
            </Button>
        </>
    )
}