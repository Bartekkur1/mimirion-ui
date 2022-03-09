import { configureStore } from '@reduxjs/toolkit';
import storageReducer from './reducers/storage';
import configurationReducer from './reducers/config';

export const store = configureStore({
    reducer: {
        storage: storageReducer,
        config: configurationReducer
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;