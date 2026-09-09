import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import lines from '@/data/lines.json';

import colors from '@/globals/colors';
import LineBriefItem from '@/components/LineBriefItem';
import { Line } from '@/types/lines';

const LINES = lines as Line[];

const RoutesScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <View style={styles.header} >
                {/* barra de pesquisa, possivelmente ??? */}
            </View>

            <FlatList
                data={LINES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LineBriefItem lineDetails={item} />
                )}
            />
        </SafeAreaView>
    );
};

export default RoutesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        height: 90,
        backgroundColor: colors.primary,
    },
});