import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Line } from '@/types/lines';
import colors from '@/globals/colors';

interface LineBriefItemProps {
    lineDetails: Line;
}

const LineBriefItem = ({ lineDetails }: LineBriefItemProps) => {
    const navigation = useNavigation();

    return (
        <Pressable 
            style={styles.container}
            onPress={() => 
                navigation.navigate('RouteDetails')
            }
        >
            <View style={styles.lineBox} >
                <View style={styles.lineContent}>
                    <Ionicons
                        name='bus'
                        size={16}
                        color='#0d0d0d'
                    />
                    <Text style={styles.lineNumber}>
                        {lineDetails.id}
                    </Text>
                </View>

                <View style={[
                        styles.colorBar,
                        { backgroundColor: lineDetails.color }
                    ]} 
                />
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.name}>
                    {lineDetails.name}
                </Text>
            </View>
        </Pressable>
    );
};

export default LineBriefItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
    },

    lineBox: {
        width: 70,
        height: 40,
        borderWidth: 1.5,
        borderColor: '#222',
        justifyContent: 'center',
        position: 'relative',
    },

    lineContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    lineNumber: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111',
        marginLeft: 2,
    },

    colorBar: {
        position: 'absolute',
        bottom: -1,
        left: 5,
        right: 5,
        height: 3,
        marginBottom: 5,
    },

    nameContainer: {
        flex: 1,
        minWidth: 0,
        marginLeft: 16,
    },

    name: {
        fontSize: 11,
        fontWeight: '600',
        color: '#111',
        flexShrink: 1,
    },
});
