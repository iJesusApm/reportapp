import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {Report} from '../types'

type Props = {
  item: Report
  onRemoveReport: (id: number) => void
}

const ReportComponent = ({item, onRemoveReport}: Props): JSX.Element => {
  const {title, description, image} = item

  const handleRemoveReport = async () => {
    try {
      const storedReportList = await AsyncStorage.getItem('reportList')
      if (storedReportList !== null) {
        const updatedReportList = JSON.parse(storedReportList).filter((report: Report) => report.id !== item.id)
        await AsyncStorage.setItem('reportList', JSON.stringify(updatedReportList))
      }

      onRemoveReport(item.id)
    } catch (error) {
      console.log('Error al eliminar el reporte:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.reportItem}>
        <Text style={styles.reportDescription}>Imagen: {image}</Text>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.reportDescription}>{description}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemoveReport}>
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderTopWidth: 1,
    marginTop: 8,
  },
  reportItem: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reportTitle: {
    marginVertical: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportDescription: {
    marginVertical: 4,
    fontSize: 16,
    fontWeight: '400',
  },
  removeButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})

export default ReportComponent
