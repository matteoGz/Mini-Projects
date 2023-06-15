
import { Box, HStack, Text } from 'native-base';

export default function Footer(){
    return(
        <Box bg="violet.600" py={2} px={4}>
            <HStack justifyContent="center">
                <Text fontSize="sm" color="white">
                    This is the footer of the app
                </Text>
            </HStack>
        </Box>
    )
}
/*
const styles = StyleSheet.create({
    footer:{
        backgroundColor: colors.violet[500],
        padding: 30,
        borderTopWidth: 1,
        borderTopColor: colors.violet[50],
        borderRadius: 100,
        margin: 5,
        title: { fontSize: 18, fontWeight: 'bold', color: colors.light[1] }
    }
})
*/