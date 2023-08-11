import { StyleSheet, TouchableHighlight } from 'react-native'
import { Button } from '@rneui/themed'
import { router } from 'expo-router'

import { Text, View } from '../../../common/components/Themed'
import { Icon } from '../../../common/components/Icon'

interface ItemProps {
  name: string
  add: boolean
}

export const Item = ({ name, add }: ItemProps) => {
  const navigate = (href: string) => {
    router.push(href)
  }
  return (
    <View style={styles.itemWrapper}>
      <TouchableHighlight>
        {add ? (
          <Button
            type="clear"
            onPress={() => {
              navigate('/modal/add-ubication')
            }}
          >
            <Icon name="plus" />
          </Button>
        ) : (
          <Button
            type="outline"
            buttonStyle={{
              borderColor: 'gray',
              borderRadius: 15
            }}
          >
            <Text>{name}</Text>
          </Button>
        )}
      </TouchableHighlight>
    </View>
  )
}
const styles = StyleSheet.create({
  itemWrapper: {
    alignContent: 'center',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginLeft: 0
  }
})
