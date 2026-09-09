import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

const FavoritesScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <Text>FavoritesScreen</Text>
        </SafeAreaView>
    );
};

export default FavoritesScreen;