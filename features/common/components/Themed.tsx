/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  // useColorScheme,
  View as DefaultView
} from 'react-native'

// import Colors from '../../../constants/Colors'

// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light'
//   const colorFromProps = props[theme]

//   return colorFromProps ?? Colors[theme][colorName]
// }

interface ThemeProps {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const color = '#000'

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  // const backgroundColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   'background'
  // )
  const backgroundColor = '#FFF'

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
