import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

import lines from '@/data/lines.json';

import LineBriefItem from '@/components/LineBriefItem';
import colors from '@/globals/colors';
import { Line } from '@/types/lines';
import { fuzzySearch } from '@/utils/searchEngine';

const LINES = lines as Line[];

const RoutesScreen = () => {
    const [ search, setSearch ] = useState<string>('');
    const [ filteredData, setFilteredData ] = useState<typeof LINES>([]);

    const handleSearch = (t: string) => {
        setSearch(t);

        const results = fuzzySearch(LINES, t)

        setFilteredData(results);
    }

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <View style={styles.header} >
                <TextInput
                    style={styles.searchBar}
                    placeholder='Pesquise uma linha'
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={filteredData}
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    searchBar: {
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 15,
        borderRadius: 5,
    },
});