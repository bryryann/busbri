import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

const RouteDetailsScreen = () => {

    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <Text>RouteDetailsScreen</Text>
        </SafeAreaView>
    );
};

export default RouteDetailsScreen;