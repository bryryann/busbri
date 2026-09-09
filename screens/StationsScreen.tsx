import { SafeAreaView } from 'react-native-safe-area-context';
import { BusMap } from '@/components';

const StationsScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <BusMap />
        </SafeAreaView>
    );
};

export default StationsScreen;