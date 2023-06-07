import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ReportList = () => {
  return (
    <View style={styles.container}>
      <Text>ReportList Component</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ReportList
