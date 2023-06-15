import { Box, HStack, IconButton, NavItem, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

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
            <HStack p={2} bg="violet.600" justifyContent="space-between" alignItems="center">
                <IconButton
                    rounded='full'
                    icon={<MaterialIcons name="menu" size={24} color="white" />}
                    onPress={handleNavMenuPress}
                />
                <Text fontSize="xl" fontWeight="bold" color="white">
                    My App
                </Text>
                <IconButton
                    rounded='full'
                    icon={<MaterialIcons name="search" size={24} color="white" />}
                    onPress={handleSearchPress}
                />
            </HStack>
            { isMenuPress && (
                <Box bg="white" p={4}>
                    <HStack justifyContent="space-around">
                        <Text fontSize="md" fontWeight="bold" color="gray.500" p={2}>
                            NavItem
                        </Text>
                    </HStack>
                </Box>
             )
            }
            { isSearchPress && (
                <Box bg="white" p={4}>
                    <HStack justifyContent="space-around">
                        <Text fontSize="md" fontWeight="bold" color="gray.500" p={2}>
                            Search...
                        </Text>
                    </HStack>
                </Box>
                )
            }
    </Box>
    )
}
/*
const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.violet[500],
      padding: 30,
      borderBottomWidth: 1,
      borderBottomColor: colors.violet[50],
      title: { fontSize: 18, fontWeight: 'bold', color: colors.light[1] }
    },
})
*/