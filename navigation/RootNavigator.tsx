import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from "./TabsNavigator";
import RouteDetailsScreen from "@/screens/RouteDetailsScreen";
import { RootStackParamList } from "@/types/rootNavigator";
import { StyleSheet } from "react-native";
import colors from "@/globals/colors";

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
                    title: 'Linha',
                    headerStyle: styles.routeDetailsHeader,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 700,
                    }
                }}

            />
        </Stack.Navigator>
    );
};

export default RootNavigator;

const styles = StyleSheet.create({
    routeDetailsHeader: {
        height: 90,
        backgroundColor: colors.primary,
    },
})