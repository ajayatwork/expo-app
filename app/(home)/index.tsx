import { View, Text } from 'react-native'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
      <Text style={{fontSize: 20, color: "#000"}}>This is Home</Text>
    </View>
  )
}

export default Home