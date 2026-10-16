import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "@/types/rootNavigator";
import colors from "@/globals/colors";
import linesData from '@/data/lines.json';
import { Line } from "@/types/lines";

const LINES = linesData as Line[];

interface FavoriteLineItemProps {
    id: string;
};

const FavoriteLineItem = ({ id }: FavoriteLineItemProps) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const favoriteLine: Line = LINES.find(
        (line) => line.id === id
    ) ?? {
        id: "-",
        name: "N/A",
        color: "#ffffff",
        route: { type: "LineString", coordinates: [[1, 1]] },
        stop_ids: ["-1"],
    };

    const handlePress = () => {
        navigation.navigate('RouteDetails', {
            lineDetails: favoriteLine
        });
    };

    return (
        <Pressable
            style={[
                styles.favoriteItem,
                { borderLeftColor: favoriteLine.color },
            ]}
            onPress={handlePress}
        >
            <View
                style={[
                    styles.itemIcon,
                    { backgroundColor: `${favoriteLine.color}20` },
                ]}
            >
                <Ionicons
                    name="bus-outline"
                    size={19}
                    color={favoriteLine.color === "#ffffff"
                        ? colors.primary
                        : favoriteLine.color}
                />
            </View>

            <View style={styles.itemContent}>
                <Text
                    style={styles.itemName}
                    numberOfLines={1}
                >
                    {favoriteLine.name}
                </Text>

                <Text style={styles.itemId}>
                    Linha {id}
                </Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={17}
                color="#8B91A0"
            />
        </Pressable>
    );
};

export default FavoriteLineItem;

const styles = StyleSheet.create({
    favoriteItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#EAECF0",
        borderLeftWidth: 4,
        marginTop: 6,
        gap: 10,
    },

    itemIcon: {
        width: 34,
        height: 34,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },

    itemContent: {
        flex: 1,
        justifyContent: "center",
        gap: 2,
    },

    itemName: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "600",
    },

    itemId: {
        color: "#8B91A0",
        fontSize: 11,
        fontWeight: "500",
    },
});