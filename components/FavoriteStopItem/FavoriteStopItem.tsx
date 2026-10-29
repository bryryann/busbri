import { Image, StyleSheet, Text, View } from "react-native";

import colors from "@/globals/colors";
import stopsData from '@/data/stops.json';
import { Stop } from "@/types/lines";

// EN: Converts the imported JSON data into an array of bus stops.
// PT: Converte os dados JSON importados em um array de pontos de ônibus.
const STOPS = stopsData as Stop[];

interface FavoriteStopItemProps  {
    // EN: ID of the favorite bus stop to be displayed.
    // PT: ID do ponto de ônibus favorito que será exibido.
    id: string;
};

// EN: Component that displays a favorite bus stop with its image and name.
// PT: Componente que exibe um ponto de ônibus favorito com sua imagem e seu nome.
const FavoriteStopItem = ({ id }: FavoriteStopItemProps) => {
    // EN: Finds the bus stop matching the provided ID. Provides fallback data when request stop is not found.
    // PT: Busca o ponto de ônibus correspondente ao ID informado. Fornece dados padrão quando ponto não é encontrado.
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