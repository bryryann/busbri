import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    View, 
    Text, 
    TextInput, 
    SectionList,
    FlatList, 
    StyleSheet 
} from 'react-native';

import lines from '@/data/lines.json';
import LineBriefItem from '@/components/LineBriefItem';
import colors from '@/globals/colors';
import { Line } from '@/types/lines';
import { fuzzySearch } from '@/utils/searchEngine';

const LINES = lines as Line[];
const MAX_RECENTS = 5;

const RoutesScreen = () => {
    const [ search, setSearch ] = useState<string>('');
    const [ recentLines, setRecentLines ] = useState<Line[]>([]);
    //const [ filteredData, setFilteredData ] = useState<typeof LINES>(LINES);

    const filteredLines = fuzzySearch(
        LINES,
        search
    );

    const filteredRecentLines = fuzzySearch(
        recentLines,
        search
    );

    const filteredOtherLines = filteredLines.filter(
        (line) => (
            !recentLines.some(
                recent => recent.id === line.id
            )
        )
    );

    const handleLinePress = (line: Line) => {
        setRecentLines(curr => {
            const withoutCurrent = curr.filter(
                recent => recent.id !== line.id
            );

            return [
                line,
                ...withoutCurrent
            ].slice(0, MAX_RECENTS);
        });
    };

    const sections = [];

    if (filteredRecentLines.length > 0) {
        sections.push({
            title: 'Recentes',
            data: filteredRecentLines
        });
    }

    if (filteredOtherLines.length > 0) {
        sections.push({
            title: 'Outras Linhas',
            data: filteredOtherLines
        });
    }

    /*
    const handleSearch = (t: string) => {
        setSearch(t);
        const results = fuzzySearch(LINES, t)
        setFilteredData(results);
    };
    */

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <View style={styles.header}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Pesquise uma linha"
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={setSearch}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) =>
                    item.id
                }
                renderSectionHeader={({
                    section,
                }) => (
                    <Text style={styles.sectionTitle}>
                        {section.title}
                    </Text>
                )}
                renderItem={({ item }) => (
                    <LineBriefItem
                        lineDetails={item}
                        onAccess={handleLinePress}
                    />
                )}
                contentContainerStyle={
                    styles.listContent
                }
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
            />
        </SafeAreaView>
    );
};

export default RoutesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    header: {
        height: 108,

        backgroundColor: colors.primary,

        justifyContent: 'flex-end',
        alignItems: 'center',

        paddingBottom: 9,
    },

    searchBar: {
        width: '90%',
        height: 33,

        backgroundColor: 'white',

        paddingHorizontal: 10,

        fontSize: 14,
    },

    listContent: {
        paddingBottom: 30,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',

        marginTop: 11,
        marginBottom: 7,
        marginHorizontal: 29,
    },
});