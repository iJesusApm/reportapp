import React, {useEffect, useState} from 'react'
import {View, Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {Report} from '../types'

const ReportList = (): JSX.Element => {
  const [reportList, setReportList] = useState<Array<Report>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getReportList = async () => {
      try {
        const storedReportList = await AsyncStorage.getItem('reportList')
        if (storedReportList !== null) {
          setReportList(JSON.parse(storedReportList))
        }
        setIsLoading(false)
      } catch (error) {
        console.log('Error al obtener la lista de reportes:', error)
        setIsLoading(false)
      }
    }

    getReportList()
  }, [])

  const renderItem = ({item}: {item: Report}) => (
    <View>
      <Text>Imagen: {item.image}</Text>
      <Text>Título: {item.title}</Text>
      <Text>Descripción: {item.description}</Text>
    </View>
  )

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reportList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Text>Lista de reportes:</Text>}
        ListEmptyComponent={<Text style={styles.emptyList}>No has agregado reportes</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyList: {
    marginTop: 40,
  },
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ReportList
