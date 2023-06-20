import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './screens/MainScreen';
import WeatherScreen from './screens/WeatherScreen';
import TemperatureScreen from './screens/TemperatureScreen';
import AdditionalInfoScreen from './screens/AdditionalInfoScreen';
import AboutScreen from './screens/AboutScreen';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Main"
          useLegacyImplementation
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen 
            name="Main"
            component={MainScreen}
          />
          <Drawer.Screen 
            name="Weather"
            component={WeatherScreen}
          />
          <Drawer.Screen
            name="Temperature"
            component={TemperatureScreen}
          />
          <Drawer.Screen
            name="Additional info"
            component={AdditionalInfoScreen}
          />
          <Drawer.Screen
            name="About info"
            component={AboutScreen}
          />
          <Drawer.Screen />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
