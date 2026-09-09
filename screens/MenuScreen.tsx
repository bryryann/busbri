import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

const MenuScreen = () => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <Text>MenuScreen</Text>
        </SafeAreaView>
    );
};

export default MenuScreen;