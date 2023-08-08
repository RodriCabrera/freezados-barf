import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'

import { View } from '../Themed'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LinkButton = ({ href, children }: any) => {
  const navigate = (href: string) => () => {
    router.push(href)
  }
  const handlePress = navigate(href)
  return (
    <View style={styles.shadow}>
      <LinearGradient
        colors={['#fae7d3', '#fad3fa', '#faf7d3']}
        start={[1, 0]}
        end={[0, 0]}
        style={{ borderRadius: 15 }}
      >
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1
            },
            styles.button
          ]}
        >
          <Text style={styles.text}>{children}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15
  },
  shadow: {
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  text: {
    color: '#484848',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5
  }
})
