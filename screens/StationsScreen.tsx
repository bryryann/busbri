import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Line } from '@/types/lines';
import LINES from '@/data/lines.json';
import CityMap from '@/components/CityMap';

const linesData = LINES as Line[]

const StationsScreen = () => {
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <CityMap linesData={linesData} />

            <View style={styles.stationMenu}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.routeList}
                >
                    {linesData.map((line) => (
                        <Pressable
                            key={line.id}
                            style={({ pressed }) => [
                                styles.routeItem,
                                pressed && styles.routeItemPressed,
                            ]}
                            onPress={() => console.log(line.name)}
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
                    ))}
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
    },

    routeItemPressed: {
        backgroundColor: '#f0f0f0',
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