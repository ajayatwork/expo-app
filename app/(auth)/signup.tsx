import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {}

const login = (props: Props) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Signup</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  text:{
    color: "#fff",
    fontSize: 20
  }
})

export default login