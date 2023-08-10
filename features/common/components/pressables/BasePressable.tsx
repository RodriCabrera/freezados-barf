import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, Text } from 'react-native'
import { type PropsWithChildren } from 'react'

import { View } from '../Themed'

export const BasePressable = ({
  children,
  onPress,
  style
}: PropsWithChildren<any>) => {
  return (
    <View style={styles.shadow}>
      <LinearGradient
        colors={['#fae7d3', '#fad3fa', '#faf7d3']}
        start={[1, 0]}
        end={[0, 0]}
        style={{ borderRadius: 15 }}
      >
        <Pressable onPress={onPress} style={style}>
          <Text style={styles.text}>{children}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  text: {
    color: '#484848',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5
  }
})
