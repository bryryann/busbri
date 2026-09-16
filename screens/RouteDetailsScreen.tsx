import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from 'react-native';

import { RootStackParamList } from '@/types/rootNavigator';
import colors from '@/globals/colors';
import RouteMap from '@/components/RouteMap/RouteMap';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'RouteDetails'
>;

const RouteDetailsScreen = ({ route }: Props) => {
    const { lineDetails } = route.params;

    return (
        <SafeAreaView
            edges={[]}
            style={styles.container}
        >
            <RouteMap lineDetails={lineDetails} />

            <View style={styles.content}>
                <Text style={styles.title}>
                    {lineDetails.name}
                </Text>
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

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },
});
