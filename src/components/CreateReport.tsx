import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateReport = (): JSX.Element => {
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleCreateReport = async () => {
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

      // Limpiar los campos después de guardar el reporte
      setImage('')
      setTitle('')
      setDescription('')
      Alert.alert('Éxito', 'Reporte guardado exitosamente')
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
    <View>
      <Text>Crear nuevo reporte</Text>
      <TextInput placeholder="Imagen" value={image} onChangeText={setImage} />
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TouchableOpacity onPress={handleCreateReport}>
        <Text>Crear reporte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateReport
