import { useState } from 'react';
import { 
    Image, 
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, 
    View 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '@/globals/colors';
import { FavoriteType } from '@/features/favorites/favoritesTypes';
import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import {
    selectFavoriteLines,
    selectFavoriteStops,
} from '@/features/favorites/favoritesSelectors';
import FavoriteLineItem from '@/components/FavoriteLineItem';
import FavoriteStopItem from '@/components/FavoriteStopItem';

const HomeScreen = () => {
    const [favoriteType, setFavoriteType] = useState<FavoriteType>('line');

    const favoriteLines = useAppSelector((state: RootState) => 
        selectFavoriteLines(state)
    );

    const favoriteStops = useAppSelector((state: RootState) => 
        selectFavoriteStops(state)
    );

    const favorites = 
        favoriteType === 'line'
            ? favoriteLines
            : favoriteStops;

    return (
        <SafeAreaView
            edges={['top']}
            style={{ 
                flex: 1,
                backgroundColor: '#ffffff'
            }}
        >
            <StatusBar
                barStyle='light-content'
                backgroundColor={colors.primary}
            />

            <View style={styles.screen}>
                {/* header */}
                <View style={styles.header}>
                    <View style={styles.profile}>
                        <Image
                            source={require('@/assets/images/station-placeholder.png')}
                            resizeMode='cover'
                            style={styles.avatar}
                        />

                        <View style={styles.welcome}>
                            <Text style={styles.welcomeText}>
                                Bem-Vindo
                            </Text>
                            <Text style={styles.username}>
                                Usuário{/* placeholder */}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* RENDER FAVORITES */}
                <View style={styles.content} >
                    <View style={styles.sectionHeading}>
                        <Ionicons name='star' size={20}/>

                        <Text style={styles.sectionTitle}>
                            Favoritos
                        </Text>
                    </View>

                    <View style={styles.tray}>
                        <View style={styles.trayHeader}>
                            <Text style={styles.trayTitle}>
                                Seus favoritos
                            </Text>

                            <Text style={styles.favoriteCount}>
                                {favorites.length}
                            </Text>
                        </View>

                        <View style={styles.tabs}>
                            {/* favorite lines */}
                            <Pressable
                                onPress={() => setFavoriteType('line')}
                                style={[
                                    styles.tab,
                                    favoriteType === 'line' &&
                                        styles.activeTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        favoriteType === 'line' &&
                                            styles.activeTabText,
                                    ]}
                                >
                                    Linhas
                                </Text>
                            </Pressable>

                            {/* favorite stops */}
                            <Pressable
                                onPress={() => setFavoriteType('stop')}
                                style={[
                                    styles.tab,
                                    favoriteType === 'stop' &&
                                        styles.activeTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        favoriteType === 'stop' &&
                                            styles.activeTabText,
                                    ]}
                                >
                                    Pontos
                                </Text>
                            </Pressable>
                        </View>

                        <ScrollView
                            style={styles.trayScroll}
                            contentContainerStyle={styles.trayContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {favorites.length > 0 ? (
                                favorites.map((id) => {
                                    return favoriteType === 'line'
                                        ? <FavoriteLineItem key={id} id={id} />
                                        : <FavoriteStopItem key={id} id={id} />
                                })
                            ) : (
                                <View style={styles.emptyState}>
                                    <Ionicons
                                        name={favoriteType === 'line' ? 'bus-outline' : 'location-outline'}
                                        size={32}
                                        color={colors.primary}
                                    />

                                    <Text style={styles.emptyTitle}>
                                        {favoriteType === 'line'
                                            ? 'Nenhuma linha favorita'
                                            : 'Nenhum ponto favorito'}
                                    </Text>

                                    <Text style={styles.emptyDescription}>
                                        {favoriteType === 'line'
                                            ? 'Suas linhas favoritas aparecerão aqui.'
                                            : 'Seus pontos favoritos aparecerão aqui.'}
                                    </Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        backgroundColor: colors.primary,
        paddingHorizontal: 22,
        paddingTop: 24,
        paddingBottom: 28,
        borderBottomLeftRadius: 34,
        borderBottomRightRadius: 34,
    },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22,
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.gray,
    },

    welcome: {
        marginLeft: 9,
    },

    welcomeText: {
        color: '#D7DCE8',
        fontSize: 9,
        fontWeight: '400',
    },

    username: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 1,
    },

    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 76,
    },

    headingAccent: {
        width: 3,
        height: 43,
        backgroundColor: '#FFFFFF',
        marginRight: 10,
    },

    heading: {
        color: '#FFFFFF',
        fontSize: 23,
        lineHeight: 27,
        fontWeight: '500',
        letterSpacing: -0.5,
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
        minHeight: 0,
    },

    sectionHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    star: {
        color: '#111111',
        fontSize: 17,
        marginRight: 9,
    },

    sectionTitle: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '700',
    },

    tray: {
        flex: 1,
        minHeight: 150,
        maxHeight: 340,
        backgroundColor: '#F7F8FA',
        borderColor: '#E8EAF0',
        borderWidth: 1,
        borderRadius: 20,
        padding: 14,
        marginBottom: 14,
    },

    trayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 13,
    },

    trayTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.primary,
    },

    favoriteCount: {
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: '#E6EEFC',
        color: colors.primary,
        fontSize: 12,
        fontWeight: '700',
        minWidth: 26,
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    tabs: {
        flexDirection: 'row',
        backgroundColor: '#E9EBF0',
        borderRadius: 12,
        padding: 3,
        marginBottom: 8,
    },

    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        paddingVertical: 9,
    },

    activeTab: {
        backgroundColor: '#FFFFFF',
        elevation: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },

    tabText: {
        color: '#727782',
        fontSize: 13,
        fontWeight: '500',
    },

    activeTabText: {
        color: colors.primary,
        fontWeight: '700',
    },

    trayScroll: {
        flex: 1,
        minHeight: 0,
    },

    trayContent: {
        flexGrow: 1,
    },

    emptyState: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
    },

    emptyIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#E8EFFD',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    emptyIconText: {
        color: colors.secondary,
        fontSize: 24,
    },

    emptyTitle: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 5,
    },

    emptyDescription: {
        color: '#7C8290',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center',
    },

    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 11,
        paddingHorizontal: 9,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginTop: 5,
    },

    itemIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#E8EFFD',
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemIconText: {
        color: colors.secondary,
        fontSize: 20,
    },

    itemName: {
        flex: 1,
        color: colors.primary,
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 10,
    },

    itemArrow: {
        color: '#8B91A0',
        fontSize: 23,
    },

    // Quick access
    quickAccess: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },

    quickItem: {
        flex: 1,
        height: 76,
        backgroundColor: '#E0E0E0',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },

    quickIcon: {
        color: '#080808',
        fontSize: 29,
        lineHeight: 34,
        fontWeight: '500',
    },

    quickLabel: {
        color: '#111111',
        fontSize: 11,
        fontWeight: '500',
        marginTop: 3,
    },

    // Bottom navigation
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingHorizontal: 8,
        paddingTop: 7,
        paddingBottom: 4,
    },

    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },

    navIcon: {
        width: 34,
        height: 34,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navIconActive: {
        backgroundColor: colors.secondary,
    },

    navIconText: {
        color: '#111111',
        fontSize: 20,
        lineHeight: 25,
    },

    navIconTextActive: {
        color: '#FFFFFF',
    },

    navLabel: {
        color: '#242424',
        fontSize: 9,
        fontWeight: '500',
    },

    navLabelActive: {
        color: colors.secondary,
        fontWeight: '700',
    },
});