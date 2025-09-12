import { TabBar } from '@/src/components/bottomTabs';
import { m } from '@/src/utils/metrics';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: "home/index",
};

const TAB_ITEMS = [
  {
    name: "home/index",
    label: "Home",
    icon: (color: string) => <Octicons name="home" size={m(20)} color={color} />,
  },
  {
    name: "advisoAI/index",
    label: "Adviso AI",
    icon: (color: string) => <FontAwesome5 name="brain" size={m(20)} color={color} />,
  },
  {
    name: "profile/index",
    label: "Profile",
    icon: (color: string) => <FontAwesome5 name="user" size={m(20)} color={color} />,
  },
];

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} tabItems={TAB_ITEMS} />}
      screenOptions={{
        headerShown: false,
      }}>
      {TAB_ITEMS.map((item) => (
        <Tabs.Screen key={item.name} name={item.name} />
      ))}
    </Tabs>
  );
}

