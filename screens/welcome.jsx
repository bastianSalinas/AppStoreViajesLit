import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/native';

export const Welcome = () => {
  const { navigate } = useNavigation()
  const handlePress = () => {
    navigate('Home')
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require('../assets/Welcome/libros.jpg')} />
      <View style={styles.texts}>
        <Text style={styles.title}>ViajesLit</Text>
        <Text style={styles.text}>Viaja a través de las palabras.</Text>
      </View>
      <Button onPress={handlePress}>Descubrir</Button>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea:
  {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  texts:
  {
    alignItems: 'center',
    gap: 4,
  },
  title:
  {
    fontSize: 64,
    fontWeight: 'bold'
  },
  text:
  {
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 20,
  },
  logo:
  {
    flexDirection: 'row',
  },
});