import { SafeAreaView } from 'react-native-safe-area-context';
import CityMap from '@/components/CityMap';

const StationsScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <CityMap />
        </SafeAreaView>
    );
};

export default StationsScreen;