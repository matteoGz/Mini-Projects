import 'react-native-gesture-handler';
import { Button, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './screens/MainScreen';
import WeatherScreen from './screens/WeatherScreen';
import TemperatureScreen from './screens/TemperatureScreen';
import AdditionalInfoScreen from './screens/AdditionalInfoScreen';
import AboutScreen from './screens/AboutScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import { navMenu } from './models/navMenu';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Main"
          useLegacyImplementation
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{ headerRight: () => <Button
                                                bg={"violet.500"}
                                                color={"white"}
                                              > 
                                              { navMenu[4].icon }
                                              </Button>
                          }}
        >
          <Drawer.Screen 
            name="Home"
            component={MainScreen}
            options={{ drawerIcon: () => navMenu[0].icon }}
          />
          <Drawer.Screen
            name="Weather"
            component={WeatherScreen}
            options={{ drawerIcon: () => navMenu[1].icon }}
          />
          <Drawer.Screen
            name="Temperature"
            component={TemperatureScreen}
            options={{ drawerIcon: () => navMenu[2].icon }}
          />
          <Drawer.Screen
            name="Additional info"
            component={AdditionalInfoScreen}
            options={{ drawerIcon: () => navMenu[3].icon }}
          />
          <Drawer.Screen
            name="About info"
            component={AboutScreen}
            options={{ drawerIcon: () => navMenu[5].icon }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
