import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Stop } from "@/types/lines";
import FavoriteButton from '../FavoriteButton/FavoriteButton';

interface StopDetailsProps {
    stop: Stop
};

const StopDetails = ({ stop }: StopDetailsProps) => {
    return (
        <View style={styles.stopItem}>
            <Image
                source={require('@/assets/images/station-placeholder.png')}
                style={styles.stopImage}
                resizeMode='cover'
            />

            <View style={styles.stopInfo}>
                <Text style={styles.stopName}>
                    {stop.name}
                </Text>

                <View style={styles.walkingTime}>
                        <Ionicons
                            name="walk"
                            size={16}
                            color="#555"
                        />
                        <Text style={styles.stopDetail}>
                            Tempo estimado indisponível
                        </Text>
                </View>

                <Text style={styles.stopRoutes}>
                    {stop.routes?.join(', ') ?? ''}
                </Text>

            </View>

            <FavoriteButton type='stop' id={stop.id} />
        </View>

    );
};

export default StopDetails;

const styles = StyleSheet.create({
    stopItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            minHeight: 80,
        },

    stopImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#DEDEDE',
    },

    stopInfo: {
        flex: 1,
        minWidth: 0,
        marginLeft: 15,
        marginRight: 8,
        justifyContent: 'center',
    },

    stopName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
        marginBottom: 4,
    },

    stopDetail: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
    },

    stopRoutes: {
        fontSize: 12,
        fontWeight: '800',
        color: '#777',
        marginTop: 4,
    },

    walkingTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    }
})