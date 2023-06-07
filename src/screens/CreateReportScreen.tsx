import React from 'react'
import {View, StyleSheet} from 'react-native'
import CreateReport from '../components/CreateReport'

const Create = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <CreateReport />
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

export default Create
