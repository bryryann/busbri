import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <Text>HomeScreen</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;