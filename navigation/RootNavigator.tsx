import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from "./TabsNavigator";
import RouteDetailsScreen from "@/screens/RouteDetailsScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={TabsNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RouteDetails"
                component={RouteDetailsScreen}
                options={{
                    title: 'Linha'
                }}

            />
        </Stack.Navigator>
    )
};

export default RootNavigator;