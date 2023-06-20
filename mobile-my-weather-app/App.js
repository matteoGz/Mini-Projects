import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import DrawerApp from './components/DrawerApp';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <DrawerApp/>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
