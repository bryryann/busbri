import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RoutesScreen from "@/screens/RoutesScreen";
import FavoritesScreen from "@/screens/FavoritesScreen";
import HomeScreen from "@/screens/HomeScreen";
import StationsScreen from "@/screens/StationsScreen";
import MenuScreen from "@/screens/MenuScreen";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
                name="Routes"
                component={RoutesScreen}
            />

            <Tab.Screen 
                name="Favorites"
                component={FavoritesScreen}
            />

            <Tab.Screen 
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen 
                name="Stations"
                component={StationsScreen}
            />

            <Tab.Screen 
                name="Menu"
                component={MenuScreen}
            />
        </Tab.Navigator>
    )
}

export default TabsNavigator;