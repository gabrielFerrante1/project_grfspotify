import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import playerReducer from './reducers/playerReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        player: playerReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;  