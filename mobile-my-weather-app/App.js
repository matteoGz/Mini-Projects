import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import DrawerApp from './components/DrawerApp';
import TabNav from './components/TabNav';

export default function App() {
  return (
    <NativeBaseProvider>
      <TabNav/>
    </NativeBaseProvider>
  );
}
