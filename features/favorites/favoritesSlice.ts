import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavoritesState } from "./favoritesTypes";

const initialState: FavoritesState = {
    lines: [],
    stops: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavoriteLine: (state, action: PayloadAction<string>) => {
            const id = action.payload;

            if (state.lines.includes(id)) {
                state.lines = state.lines.filter(item => item !== id);
            } else {
                state.lines.push(id);
            }
        },

        clearFavoriteLines: (state, _) => {
            state.lines = initialState.lines;
        },

        toggleFavoriteStop: (state, action: PayloadAction<string>) => {
            const id = action.payload;

            if (state.stops.includes(id)) {
                state.stops = state.stops.filter(item => item !== id);
            } else {
                state.stops.push(id);
            }
        },

        clearFavoriteStops: (state, _) => {
            state.stops = initialState.stops;
        },
    },
});

export const {
    toggleFavoriteLine,
    clearFavoriteLines,
    toggleFavoriteStop,
    clearFavoriteStops,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;