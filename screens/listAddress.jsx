import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Button } from '../components/button'
import { useNavigation } from '@react-navigation/native'

export const ListAddress = () => {
  const { navigate } = useNavigation()
  const address = useSelector(state => state.auth.value.location.address)

  const goToLocationSelector = () => navigate('LocationSelector')

  return (
    <View>
      <Text>Lista de direcciones</Text>
      <Text>{address}</Text>
      <Button onPress={goToLocationSelector}>Cambiar dirección</Button>
    </View>
  )
}