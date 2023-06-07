import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as ImagePicker from 'expo-image-picker'

import {SCREENS_ROUTES} from '../navigation/constants'

const CreateReport = (): JSX.Element => {
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigation = useNavigation()

  const validateFields = () => {
    if (!image || !title || !description) {
      Alert.alert('Error', 'Por favor, completa todos los campos')
      return false
    }
    return true
  }

  const handleCaptureImage = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      alert('Se requieren permisos de cámara para tomar fotos.')
      return
    }
    const result = await ImagePicker.launchCameraAsync({aspect: [1, 1]})
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleCreateReport = async () => {
    if (!validateFields()) {
      return
    }

    const report = {
      id: Date.now(),
      image,
      title,
      description,
    }

    try {
      const storedReportList = await AsyncStorage.getItem('reportList')
      let updatedReportList: Array<object> = []
      if (storedReportList !== null) {
        updatedReportList = JSON.parse(storedReportList)
      }
      updatedReportList.push(report)
      await AsyncStorage.setItem('reportList', JSON.stringify(updatedReportList))

      Alert.alert('Éxito', 'Reporte guardado exitosamente', [
        {
          text: 'Ver Reportes',
          onPress: () => {
            navigation.reset({index: 0, routes: [{name: SCREENS_ROUTES.HOME}]})
          },
        },
        {
          text: 'Agregar Otro',
          onPress: () => {
            handleReset()
          },
        },
      ])
    } catch (error) {
      console.log('Error al guardar el reporte:', error)
      Alert.alert('Error', 'Error al guardar el reporte')
    }
  }

  const handleReset = () => {
    setImage('')
    setTitle('')
    setDescription('')
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo reporte</Text>
        <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
        {Boolean(image) && <Image source={{uri: image}} resizeMode="contain" style={styles.image} />}
        <TouchableOpacity style={styles.cameraButton} onPress={handleCaptureImage}>
          <Text style={styles.buttonText}>Adjuntar Imagen</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleCreateReport}>
          <Text style={styles.buttonText}>Crear reporte</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  createButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cameraButton: {
    backgroundColor: '#2980b9',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 10,
    alignSelf: 'center',
  },
})

export default CreateReport
