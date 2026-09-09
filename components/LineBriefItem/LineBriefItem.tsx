import { View, Text } from 'react-native';

import { Line } from '@/types/lines';

interface LineBriefItemProps {
    lineDetails: Line;
}

const LineBriefItem = ({ lineDetails }: LineBriefItemProps) => {
    return (
        <View>
            <Text>{lineDetails.name}</Text>
        </View>
    );
};

export default LineBriefItem;