
import { Box, HStack, Text } from 'native-base';

export default function Footer(){
    return(
        <Box bg="violet.600" py={2} px={4} rounded='xl'>
            <HStack justifyContent="center">
                <Text fontSize="sm" color="white">
                    This is the footer of the app
                </Text>
            </HStack>
        </Box>
    )
}