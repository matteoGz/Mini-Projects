import AppHeader from './components/Header';
import Content from './components/Content'
import Footer from './components/Footer';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <AppHeader/>
      <Content/>
      <Footer/>
    </NativeBaseProvider>
  );
}
