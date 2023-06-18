import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Homescreen';
import WeatherScreen from './screens/WeatherScreen';
import TemperatureScreen from './screens/TemperatureScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Weather' component={WeatherScreen}/>
          <Stack.Screen name='Temperature' component={TemperatureScreen}/>
          <Stack.Screen name='About' component={AboutScreen}/>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
