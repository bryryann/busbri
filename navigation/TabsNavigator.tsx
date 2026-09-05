import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RoutesScreen from "@/screens/RoutesScreen";
import FavoritesScreen from "@/screens/FavoritesScreen";
import HomeScreen from "@/screens/HomeScreen";
import StationsScreen from "@/screens/StationsScreen";
import MenuScreen from "@/screens/MenuScreen";

import colors from "@/globals/colors";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: "#666666",
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel
            }}
        >
            <Tab.Screen 
                name="Routes"
                component={RoutesScreen}
                options={{
                    tabBarLabel: "Ônibus",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? 'bus' : 'bus-outline'} 
                            size={size} 
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen 
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? 'star' : 'star-outline'} 
                            size={size} 
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Início",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? 'home' : 'home-outline'} 
                            size={size} 
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen 
                name="Stations"
                component={StationsScreen}
                options={{
                    tabBarLabel: "Estações",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? 'location' : 'location-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen 
                name="Menu"
                component={MenuScreen}
                options={{
                    tabBarLabel: "Menu",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? 'menu' : 'menu-outline'}
                            size={size} 
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabsNavigator;

const styles = StyleSheet.create({
    tabBar: {
        height: 75,
        paddingTop: 8,
        paddingBottom: 8,
    },   

    tabBarLabel: {
        fontSize: 12,
    },

});