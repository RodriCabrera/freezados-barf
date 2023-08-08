import { MaterialCommunityIcons } from '@expo/vector-icons'

export const TabBarIcon = ({
  name,
  color,
  size
}: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
  size?: number
}) => (
  <MaterialCommunityIcons
    style={{ marginBottom: -3 }}
    size={size ?? 28}
    name={name}
    color={color}
  />
)
