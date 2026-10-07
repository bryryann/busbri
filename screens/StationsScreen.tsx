import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Line } from '@/types/lines';
import LINES from '@/data/lines.json';
import CityMap from '@/components/CityMap';
import colors from '@/globals/colors';

const linesData = LINES as Line[]

const StationsScreen = () => {
    const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

    const selectedLine = linesData.find(
        (line) => line.id === selectedLineId
    );

    const handleLineSelection = (lineId: string | null) => {
        setSelectedLineId(lineId);
    }

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <CityMap 
                linesData={linesData}
                selectedLineId={selectedLineId}
            />

            <View style={styles.stationMenuContainer}>
                <View style={styles.stationMenu}>
                    {selectedLine && (
                        <Pressable
                            style={({ pressed }) => [
                                styles.routeTitle,
                                pressed && styles.routeTitlePressed,
                            ]}
                            onPress={() => {
                                // TODO: navigate to route information screen
                            }}
                        >
                            <Text
                                style={styles.routeTitleText}
                                numberOfLines={1}
                            >
                                {selectedLine.name}
                            </Text>

                            <Text style={styles.routeTitleArrow}>
                                ›
                            </Text>
                        </Pressable>
                    )}

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.routeList}
                    >
                        {linesData.map((line) => {
                            const selected = selectedLineId === line.id;                        

                            return (
                            <Pressable
                                key={line.id}
                                style={({ pressed }) => [
                                    styles.routeItem,
                                    selected &&
                                    styles.routeItemSelected,
                                    pressed && styles.routeItemPressed,
                                ]}
                                onPress={() => handleLineSelection(selected ? null : line.id)}
                            >
                                <View
                                    style={[
                                        styles.routeColor,
                                        { backgroundColor: line.color }
                                    ]}
                                />

                                <Text style={styles.routeName}>
                                    {line.id}
                                </Text>
                            </Pressable>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default StationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    stationMenuContainer: {
        position: 'absolute',
        bottom: 0,
    },

    stationMenu: {
        alignSelf: 'stretch',
        backgroundColor: 'white',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,

        overflow: 'hidden',
    },

    routeTitle: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 8,

        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },

    routeTitlePressed: {
        backgroundColor: '#f5f5f5',
    },

    routeTitleText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: colors.secondary,
    },

    routeTitleArrow: {
        marginLeft: 8,

        fontSize: 24,
        lineHeight: 24,
        fontWeight: '300',
        color: '#888',
    },

    routeList: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        gap: 2,
    },

    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginHorizontal: 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    routeItemPressed: {
        backgroundColor: '#f0f0f0',
    },

    routeItemSelected: {
        backgroundColor: '#97d5f43c',
        borderWidth: 1,
        borderColor: '#5299df',
    },

    routeColor: {
        width: 12,
        height: 12,
        borderRadius: 3,
        marginRight: 6,
    },

    routeName: {
        fontSize: 14,
        fontWeight: '500',
    },
});