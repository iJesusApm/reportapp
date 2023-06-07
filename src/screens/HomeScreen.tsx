import React from 'react'
import {View, StyleSheet} from 'react-native'
import ReportList from '../components/ReportList'

const Home = () => {
  return (
    <View style={styles.container}>
      <ReportList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})

export default Home
