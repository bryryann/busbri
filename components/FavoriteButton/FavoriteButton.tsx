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
    variant?: 'star' | 'heart';
}

const FavoriteButton = ({
    type,
    id,
    variant = 'star',
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

    const iconName =
        variant === 'heart'
            ? isFavorite
                ? 'heart'
                : 'heart-outline'
            : isFavorite
                ? 'star'
                : 'star-outline';

    const filledIconColor =
        variant === 'heart'
            ? '#ff0707'
            : '#FFC107'

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
                pressed && styles.pressed,
            ]}
        >
            <Ionicons
                name={iconName}
                size={22}
                color={isFavorite ? filledIconColor : '#777'}
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
    },

    pressed: {
        opacity: 0.6,
        transform: [{ scale: 0.92 }],
    },
});