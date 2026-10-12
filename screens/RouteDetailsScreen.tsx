import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import { RootStackParamList } from '@/types/rootNavigator';
import colors from '@/globals/colors';
import RouteMap from '@/components/RouteMap/RouteMap';
import StopDetails from '@/components/StopDetails';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'RouteDetails'
>;

const RouteDetailsScreen = ({ route }: Props) => {
    const { lineDetails } = route.params;

    const stops = [...(lineDetails.stops ?? [])].sort(
        (a, b) => a.order - b.order,
    );

    return (
        <SafeAreaView
            edges={[]}
            style={styles.container}
        >
            <RouteMap lineDetails={lineDetails} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {lineDetails.name}
                    </Text>

                    <FavoriteButton
                        type="line"
                        id={lineDetails.id}
                    />
                </View>

                <FlatList
                    data={stops}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <StopDetails stop={item} />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Nenhuma parada encontrada.
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default RouteDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    title: {
        flex: 1,
        minWidth: 0,
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },

    listContent: {
        paddingTop: 20,
        paddingBottom: 24,
    },

    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 30,
        fontSize: 14,
    },
});
