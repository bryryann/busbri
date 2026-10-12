export type FavoriteLine = {
    type: 'line';
    id: string;
};

export type FavoriteStop = {
    type: 'stop';
    id: string
};

export type Favorite = FavoriteLine | FavoriteStop;

export type FavoriteType = 'line' | 'stop'

// FavoritesState guarda apenas o id das linhas/paradas favoritados.
// Melhor performance e evita possível duplicação.
export interface FavoritesState {
    lines: string[];
    stops: string[];
}