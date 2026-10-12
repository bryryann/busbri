import type { RootState } from "@/app/store";

export const selectFavoriteLines = (state: RootState) =>
    state.favorites.lines;

export const selectFavoriteStops = (state: RootState) =>
    state.favorites.stops;

export const selectIsFavoriteLine = (
    state: RootState,
    id: string,
) => state.favorites.lines.includes(id);

export const selectIsFavoriteStop = (
    state: RootState,
    id: string,
) => state.favorites.stops.includes(id);