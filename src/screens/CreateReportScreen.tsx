import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import CreateReport from '../components/CreateReport'

const Create = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <CreateReport />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})

export default Create
