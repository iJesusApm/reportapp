import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import HomeScreen from '../../screens/HomeScreen'
import CreateScreen from '../../screens/CreateReportScreen'

import {SCREENS_ROUTES} from '../constants'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREENS_ROUTES.HOME}
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={SCREENS_ROUTES.HOME} component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name={SCREENS_ROUTES.CREATE} component={CreateScreen} options={{title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
