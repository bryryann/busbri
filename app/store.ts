import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
    persistStore, 
    persistReducer 
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import favoritesReducer from '@/features/favorites/favoritesSlice';

const rootReducer = combineReducers({
    favorites: favoritesReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/FLUSH',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PERSIST',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;