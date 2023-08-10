import { type PropsWithChildren } from 'react'
import { router } from 'expo-router'
import { Button } from '@rneui/base'

import { Text } from '../Themed'

export const LinkButton = ({
  href,
  children
}: PropsWithChildren<{ href: string }>) => {
  const navigate = (href: string) => () => {
    router.push(href)
  }
  const handlePress = navigate(href)
  return (
    <Button onPress={handlePress} type="clear">
      <Text style={{ fontSize: 16 }}>{children}</Text>
    </Button>
  )
}
