import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Ionicons} from '@expo/vector-icons'

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
      <View style={styles.row}>
        <View style={styles.item}>
          {Boolean(image) && <Image source={{uri: image}} resizeMode="contain" style={styles.image} />}
          <View style={styles.textGroup}>
            <Text style={styles.reportTitle}>{title}</Text>
            <Text style={styles.reportDescription}>{description}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <TouchableOpacity style={styles.removeButton} onPress={handleRemoveReport}>
            <Ionicons name="trash-outline" size={25} color="#FF0000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderTopWidth: 1,
    margin: 8,
  },
  reportTitle: {
    marginVertical: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  reportDescription: {
    marginVertical: 4,
    fontSize: 16,
    fontWeight: '400',
  },
  removeButton: {
    paddingHorizontal: 10,
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGroup: {
    marginLeft: 16,
  },
})

export default ReportComponent
