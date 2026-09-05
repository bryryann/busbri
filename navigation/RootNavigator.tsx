import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from "./TabsNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={TabsNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
};

export default RootNavigator;