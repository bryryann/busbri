import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/globals/colors";

interface FavoriteStopItemProps  {
    id: string;
};

const FavoriteStopItem = ({ id }: FavoriteStopItemProps) => {
    return (
        <View style={styles.favoriteItem}>
            <View style={styles.itemIcon}>
                <Ionicons
                    name='location-outline'
                    size={20}
                    color={colors.primary}
                />
            </View>

            <Text style={styles.itemName}>
                {id}
            </Text>

            <Ionicons
                name='chevron-forward'
                size={18}
                color='#8b91a0'
            />
        </View>
    );
}; 

export default FavoriteStopItem;

const styles = StyleSheet.create({
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 11,
        paddingHorizontal: 9,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginTop: 5,
    },

    itemIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#E8EFFD',
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemName: {
        flex: 1,
        color: colors.primary,
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 10,
    },
});