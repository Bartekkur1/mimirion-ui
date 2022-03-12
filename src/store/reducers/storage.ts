import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Storage } from '../../types';
import { getClientConfig } from '../../util/httpClient';
import { RootState } from '../store';
import axios from 'axios';

interface Keys {
    accessKey: string;
    restoreKey: string;
}

export interface StorageState {
    storages: Storage[];
    selected: string | undefined;
    changed: boolean;
    keys: Keys | undefined;
}

const initialState: StorageState = {
    storages: [],
    selected: undefined,
    changed: false,
    keys: undefined
};

export const getStorages = createAsyncThunk('get/storages', async () => {
    const response = await axios.get('/store', getClientConfig());
    return response.data;
});

export const createStorage = createAsyncThunk('create/storage', async (name: string) => {
    const response = await axios.put(`/store/${name}`, {}, getClientConfig());
    return response.data;
});

export const removeStorage = createAsyncThunk('remove/storage', async (id: string) => {
    return axios.delete(`/store?id=${id}`, getClientConfig());
});

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        selectStore: (state, action) => {
            state.selected = action.payload;
        },
        unsetKeys: (state) => {
            state.keys = undefined;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getStorages.fulfilled, (state, action) => {
                state.storages = action.payload;
                state.changed = false;
            })
            .addCase(removeStorage.fulfilled, (state) => {
                state.changed = true;
            })
            .addCase(createStorage.fulfilled, (state, action) => {
                state.changed = true;
                const { accessKey, restoreKey } = action.payload;
                state.keys = { accessKey, restoreKey };
            })
            .addCase(getStorages.rejected, (state) => {
                state.storages = [];
            });
    }
});

export const selectStorages = (state: RootState) => state.storage;
export const { selectStore, unsetKeys } = storageSlice.actions
export default storageSlice.reducer;