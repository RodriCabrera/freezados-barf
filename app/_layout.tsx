import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { View, useColorScheme } from 'react-native'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)'
// }

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error != null) throw error
  }, [error])

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav onLayoutRootView={onLayoutRootView} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RootLayoutNav({ onLayoutRootView }: any) {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal/species"
            options={{ presentation: 'modal', title: 'Tiempo de congelado' }}
          />
          <Stack.Screen
            name="modal/add-ubication"
            options={{ presentation: 'modal', title: 'Tiempo de congelado' }}
          />
        </Stack>
      </View>
    </ThemeProvider>
  )
}
