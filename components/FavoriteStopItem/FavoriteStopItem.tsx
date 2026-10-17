import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/globals/colors";
import stopsData from '@/data/stops.json';
import { Stop } from "@/types/lines";

const STOPS = stopsData as Stop[];

interface FavoriteStopItemProps  {
    id: string;
};

const FavoriteStopItem = ({ id }: FavoriteStopItemProps) => {
    const favoriteStop: Stop = STOPS.find(
        (stop) => stop.id === id
    ) ?? {
        id: "-",
        name: "N/A",
        coordinates: [-1, 1],
        accessible: false,
        thumbnail: "-",
    };
    
    return (
        <View style={styles.favoriteStopCard}>
            <Image
                source={require('@/assets/images/station-placeholder.png')}
                style={styles.stopImage}
                resizeMode="cover"
            />

            <Text style={styles.stopName} numberOfLines={2}>
                {favoriteStop.name}
            </Text>
        </View>
    );
}; 

export default FavoriteStopItem;

const styles = StyleSheet.create({
    favoriteStopCard: {
        width: 110,
        minHeight: 140,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'stretch',
        borderWidth: 1,
        borderColor: '#E8EAF0',
    },

    stopImage: {
        width: '100%',
        height: 90,
        backgroundColor: '#E5E7EB',
    },

    stopName: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.text,
        textAlign: 'center',
        paddingHorizontal: 5,
        marginTop: 6,
    },
});