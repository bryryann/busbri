import { Image, StyleSheet, Text, View } from 'react-native';
import { Stop } from "@/types/lines";

interface StopDetailsProps {
    stop: Stop
};

const StopDetails = ({ stop }: StopDetailsProps) => {
    return (
        <View style={styles.stopItem}>
            <Image
                source={{
                    uri: 'https://placehold.co/120x120/DEDEDE/111111?text=Foto+da+Estacao',
                }}
                style={styles.stopImage}
                resizeMode='cover'
            />

            <View style={styles.stopInfo}>
                <Text style={styles.stopName}>
                    {stop.name}
                </Text>

                <Text style={styles.stopDetail}>
                    Parada {stop.name}
                </Text>
            </View>
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
        marginLeft: 15,
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
})