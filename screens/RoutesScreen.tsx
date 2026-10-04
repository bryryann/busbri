import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

import lines from '@/data/lines.json';

import colors from '@/globals/colors';
import LineBriefItem from '@/components/LineBriefItem';
import { Line } from '@/types/lines';

const LINES = lines as Line[];

const RoutesScreen = () => {
    const [ search, setSearch ] = useState<string>('');
    const [ filteredData, setFilteredData ] = useState<typeof LINES>([]);

    const handleSearch = (t: string) => {
        setSearch(t);

        const filtered = LINES.filter(line => (
            line.name.toLowerCase().includes(t.toLowerCase())
        ));

        setFilteredData(filtered);
    }

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <View style={styles.header} >
                <TextInput
                    style={styles.searchBar}
                    placeholder='Encontre sua linha...'
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
        borderRadius: 5,
    },
});