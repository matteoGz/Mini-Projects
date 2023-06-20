import { MaterialIcons } from '@expo/vector-icons';
import { WiDayCloudy, WiThermometer } from 'weather-icons-react';
import { HomeIcon, MoonIcon } from '@primer/octicons-react';

export const navMenu = [
    { value: 0, label: 'Home', icon: <HomeIcon size={16} color="#121212"/> },
    { value: 1, label: 'Weather', icon: <WiDayCloudy size={20} color="#121212"/> },
    { value: 2, label: 'Temperatures', icon: <WiThermometer size={20} color="#121212"/> },
    { value: 3, label: 'Additional info', icon: <MaterialIcons name='add' size={18} color="#121212"/> },
    { value: 4, label: 'Dark mode', icon: <MoonIcon size={16} color="#121212"/> },
    { value: 5, label: 'About', icon: <MaterialIcons name='info-outline' size={18} color="#121212"/> }
]

export const bottomTabs = [
    { value: 0, label: 'HomeT', icon: <HomeIcon size={16} color="#121212"/> },
    { value: 1, label: 'WeatherT', icon: <WiDayCloudy size={20} color="#121212"/> },
    { value: 2, label: 'TemperaturesT', icon: <WiThermometer size={20} color="#121212"/> },
    { value: 3, label: 'Additional infoT', icon: <MaterialIcons name='add' size={18} color="#121212"/> },
    { value: 4, label: 'Dark modeT', icon: <MoonIcon size={16} color="#121212"/> },
    { value: 5, label: 'AboutT', icon: <MaterialIcons name='info-outline' size={18} color="#121212"/> }
]