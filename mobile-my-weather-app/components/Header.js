import { HStack, IconButton, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppHeader(){
    return(
        <HStack p={2} bg="violet.600" justifyContent="space-between" alignItems="center">
            <IconButton
                rounded='full'
                icon={<MaterialIcons name="menu" size={24} color="white" />}
                onPress={() => { console.log("pressed nav menu")
                // Handle menu button press
                }}
            />
            <Text fontSize="xl" fontWeight="bold" color="white">
                My App
            </Text>
            <IconButton
                rounded='full'
                icon={<MaterialIcons name="search" size={24} color="white" />}
                onPress={() => { console.log("pressed search")
                // Handle search button press
                }}
            />
        </HStack>
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