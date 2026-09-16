import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import { RootStackParamList } from '@/types/rootNavigator';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'RouteDetails'
>;

const RouteDetailsScreen = ({ route }: Props) => {
    const { lineDetails } = route.params;

    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1 }}
        >
            <Text>Route: {lineDetails.id}</Text>
        </SafeAreaView>
    );
};

export default RouteDetailsScreen;