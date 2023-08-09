import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Colors from '../../constants/Colors'
import { TabBarIcon } from '../../features/common/components/TabBarIcon'

const TabLayout = () => {
  const colorScheme = useColorScheme()
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#a75ba7',
        tabBarInactiveTintColor: '#e3a2d6',
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#fae7d3', '#fad3fa', '#faf7d3']}
            start={[1, 0]}
            end={[0, 0]}
            style={{ flex: 1, borderRadius: 20 }}
          />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Listado',
          tabBarIcon: ({ color }) => <TabBarIcon name="fridge" color={color} />,
          headerRight: () => (
            <Link href="modal/species" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialCommunityIcons
                    name="information"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Guardar nuevo',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} size={55} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Alimentos',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    position: 'absolute'
  }
})

export default TabLayout
