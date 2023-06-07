import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import ReportList from '../components/ReportList'

const Home = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ReportList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})

export default Home
