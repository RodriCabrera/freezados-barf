import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import Colors from '../constants/Colors'
import { Text, View } from '../features/common/components/Themed'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    color: Colors.light.tint,
    fontSize: 14
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
