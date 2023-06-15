import { StyleSheet, Text, View } from 'react-native';

export default function Footer(){
    return(
        <View style={styles.footer}>
            <Text style={styles.footer.title}>footer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        backgroundColor:'#2196F3',
        padding: 30,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        borderRadius: 100,
        margin: 5,
        title: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
    }
})