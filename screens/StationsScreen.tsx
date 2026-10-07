// import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Line } from '@/types/lines';
import LINES from '@/data/lines.json';
import CityMap from '@/components/CityMap';

const linesData = LINES as Line[]

const StationsScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <CityMap linesData={linesData} />
            {/* 
            <View style={styles.stationMenu}>

            </View>
            */}
        </SafeAreaView>
    );
};

export default StationsScreen;
