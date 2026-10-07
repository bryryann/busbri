import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Line } from '@/types/lines';
import LINES from '@/data/lines.json';
import CityMap from '@/components/CityMap';

const linesData = LINES as Line[]

const StationsScreen = () => {
    const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

    const handleLineSelection = (lineId: string | null) => {
        setSelectedLineId(lineId);
    }

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <CityMap 
                linesData={linesData}
                selectedLineId={selectedLineId}
            />

            <View style={styles.stationMenu}>
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
        </SafeAreaView>
    );
};

export default StationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    stationMenu: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 15,

        backgroundColor: 'white',
        borderRadius: 12,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
    },

    routeList: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },

    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginHorizontal: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    routeItemPressed: {
        backgroundColor: '#f0f0f0',
    },

    routeItemSelected: {
        backgroundColor: '#97d5f43c',
        margin: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#5299df',
    },

    routeColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },

    routeName: {
        fontSize: 14,
        fontWeight: '500',
    },
});