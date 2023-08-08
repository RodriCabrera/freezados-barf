import { router } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LinkButton = ({ href, children }: any) => {
  const navigate = (href: string) => () => {
    router.push(href)
  }
  const handlePress = navigate(href)
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1
        },
        styles.button
      ]}
    >
      <Text>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10
  }
})
