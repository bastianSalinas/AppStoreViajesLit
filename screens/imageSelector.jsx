import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from '../components/button'
import { useDispatch } from 'react-redux'
import { setCameraImage, setUserPhoto } from '../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { usePostProfileImageMutation } from '../services/shopService'
import { useSelector } from 'react-redux'

export const ImageSelector = () => {
  const [image, setImage] = useState(null)
  const { goBack } = useNavigation()
  const dispatch = useDispatch()
  const localId = useSelector(state => state.auth.value.user.localId)
  const [triggerSaveProfileImage] = usePostProfileImageMutation()
  const [isSavingProfileImage, setIsSavingProfileImage] = useState(false)

  const verifyPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) {
      Alert.alert(
        'Permisos insuficientes',
        'Necesitas dar permisos para usar la cámara',
        [{ text: 'Ok' }]
      )
      return false
    }
    return true
  }

  const pickImage = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) return

    const imageResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.25,
    })
    if (imageResult.canceled) return
    setImage(`data:image/jpeg;base64,${imageResult.assets[0].base64}`)
  }

  const confirmImage = async () => {
    try {
      setIsSavingProfileImage(true)
      dispatch(setCameraImage(image))
      dispatch(setUserPhoto(image))
      const result = await triggerSaveProfileImage({ image, localId })
      goBack()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSavingProfileImage(false)
    }
  }

  return (
    <View style={styles.imageSelector}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.actions}>
            <Button onPress={pickImage}>Tomar otra</Button>
            <Button onPress={confirmImage}>
              {isSavingProfileImage ? 'Confirmando...' : 'Confirmar'}
            </Button>
          </View>
        </>
      ) : (
        <>
          <Text>No hay foto para mostrar...</Text>
          <Button onPress={pickImage}>Tomar foto</Button>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  imageSelector: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 32,
  },
  actions: {
    gap: 16,
  },
  image: { width: 160, height: 160 },
})