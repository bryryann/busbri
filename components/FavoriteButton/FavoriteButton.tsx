import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { FavoriteType } from '@/features/favorites/favoritesTypes';

import {
    selectIsFavoriteLine,
    selectIsFavoriteStop,
} from '@/features/favorites/favoritesSelectors';

import {
    toggleFavoriteLine,
    toggleFavoriteStop,
} from '@/features/favorites/favoritesSlice';

interface FavoriteButtonProps {
    type: FavoriteType;
    id: string;
}

const FavoriteButton = ({
    type,
    id,
}: FavoriteButtonProps) => {
    const dispatch = useAppDispatch();

    const isFavorite = useAppSelector((state) => {
        switch (type) {
            case 'line':
                return selectIsFavoriteLine(state, id);

            case 'stop':
                return selectIsFavoriteStop(state, id);
        }
    });

    const handlePress = () => {
        switch (type) {
            case 'line':
                dispatch(toggleFavoriteLine(id));
                break;

            case 'stop':
                dispatch(toggleFavoriteStop(id));
                break;
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            onStartShouldSetResponder={() => true}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
                isFavorite
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'
            }
            accessibilityState={{ selected: isFavorite }}
            style={({ pressed }) => [
                styles.button,
                isFavorite && styles.activeButton,
                pressed && styles.pressed,
            ]}
        >
            <Ionicons
                name={isFavorite ? 'star' : 'star-outline'}
                size={22}
                color={isFavorite ? '#F5A623' : '#777'}
            />
        </Pressable>
    );
};

export default FavoriteButton;

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'transparent',
    },

    activeButton: {
        backgroundColor: '#FFF6E5',
    },

    pressed: {
        opacity: 0.65,
        transform: [{ scale: 0.92 }],
    },
});