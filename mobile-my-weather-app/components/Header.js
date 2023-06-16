import { useState } from 'react';
import { Box, HStack, HamburgerIcon, IconButton, Menu, Pressable, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { WiDayCloudy, WiThermometer } from 'weather-icons-react';
import { HomeIcon, MoonIcon } from '@primer/octicons-react';

const navMenu = [
    { value: 0, label: 'Home', icon: <HomeIcon size={16} color="#121212"/> },
    { value: 1, label: 'Weather', icon: <WiDayCloudy size={20} color="#121212"/> },
    { value: 2, label: 'Temperatures', icon: <WiThermometer size={20} color="#121212"/> },
    { value: 3, label: 'Additional info', icon: <MaterialIcons name='add' size={18} color="#121212"/> },
    { value: 4, label: 'Dark mode', icon: <MoonIcon size={16} color="#121212"/> },
    { value: 5, label: 'About', icon: <MaterialIcons name='info-outline' size={18} color="#121212"/> }
]

export default function AppHeader(){
    const [isMenuPress, setIsMenuPress] = useState(false)
    const [isSearchPress, setIsSearchPress] = useState(false)
    
    const handleNavMenuPress = () => {
        setIsMenuPress(!isMenuPress)
        setIsSearchPress(false)
    }
    const handleSearchPress = () => {
        setIsSearchPress(!isSearchPress)
        setIsMenuPress(false)
    }
    
    return(
        <Box p={2}>
            <HStack p={2} bg="violet.600" justifyContent="space-between" alignItems="center" rounded='xl'>
                <Menu
                    w="190"
                    rounded='xl'
                    closeOnSelect={false}
                    onOpen={handleNavMenuPress}
                    onClose={handleNavMenuPress}
                    trigger={triggerProps => {
                        console.log("trigger fx...", triggerProps)
                        return(
                            <Pressable {...triggerProps}>
                                <HamburgerIcon p={2} color='white'/>
                            </Pressable>
                        )}
                    }
                >
                { isMenuPress && (
                    navMenu.map( navItem =>
                        <Menu.Item key={navItem.value} value={navItem.value} rounded='xl'>
                            { navItem.icon }{ navItem.label }
                        </Menu.Item>      
                        )
                    )
                }
                </Menu>
                <Text fontSize="xl" fontWeight="bold" color="white">
                    My App
                </Text>
                <IconButton
                    rounded='full'
                    icon={<MaterialIcons name="search" size={24} color="white" />}
                    onPress={handleSearchPress}
                />
            </HStack>
            
            { isSearchPress && (
                <Box bg="#f2f2f2" p={4} rounded='full'>
                    ...search
                </Box>
                )
            }
    </Box>
    )
}