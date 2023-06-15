import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.header.title}>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor:'#2196F3',
      padding: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      title: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
    },
})