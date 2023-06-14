import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.header.title}>Header</Text>
      </View>
      <View style={styles.container}>
        <Text>My weather app</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer.title}>Footer</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor:'#2196F3',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    title: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    backgroundColor:'#2196F3',
    padding: 30,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    title: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
  }
});
