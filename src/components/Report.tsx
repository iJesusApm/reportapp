import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Report} from '../types'

type Props = {
  item: Report
}

const ReportComponent = ({item}: Props): JSX.Element => {
  const {title, description, image} = item
  return (
    <View style={styles.container}>
      <View style={styles.reportItem}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.reportDescription}>{description}</Text>
        <Text style={styles.reportDescription}>Imagen: {image}</Text>
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
})

export default ReportComponent
