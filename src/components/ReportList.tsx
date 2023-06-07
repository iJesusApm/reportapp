import React, {useEffect, useState} from 'react'
import {View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {Report} from '../types'
import ReportComponent from './Report'
import {SCREENS_ROUTES} from '../navigation/constants'

const ReportList = (): JSX.Element => {
  const [reportList, setReportList] = useState<Array<Report>>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

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

  const handleCreateReport = () => {
    navigation.navigate(SCREENS_ROUTES.CREATE)
  }

  const handleRemoveReport = (reportId: number) => {
    const updatedList = reportList.filter(report => report.id !== reportId)
    setReportList(updatedList)
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reportList}
        renderItem={({item}: Report) => <ReportComponent item={item} onRemoveReport={handleRemoveReport} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Text style={styles.title}>Lista de reportes</Text>}
        ListEmptyComponent={<Text style={styles.emptyList}>No has agregado reportes</Text>}
        contentContainerStyle={styles.list}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateReport}>
          <Text style={styles.createButtonText}>Crear Reporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    textAlign: 'center',
  },
  emptyList: {
    fontSize: 20,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
  },
  list: {
    margin: 10,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  createButton: {
    backgroundColor: '#2980b9',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  createButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})

export default ReportList
