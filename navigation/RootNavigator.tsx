import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from "./TabsNavigator";
import RouteDetailsScreen from "@/screens/RouteDetailsScreen";
import { RootStackParamList } from "@/types/rootNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    );
};

export default RootNavigator;