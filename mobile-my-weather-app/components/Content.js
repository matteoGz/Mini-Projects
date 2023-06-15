import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../assets/theme';

export default function Content(){
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.text}>My weather app</Text>
                <StatusBar style="auto"/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light[1],
        alignItems: 'center',
        justifyContent: 'center' 
    },
    text: {
        color: colors.dark[1]
    }
  });