import { MaterialCommunityIcons } from '@expo/vector-icons'

// MaterialCommunityIcons list: https://icons.expo.fyi/

export interface IconProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color?: string
  size?: number
}

export const Icon = ({ name, color, size }: IconProps) => (
  <MaterialCommunityIcons
    size={size ?? 28}
    name={name}
    color={color ?? 'black'}
  />
)
