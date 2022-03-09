import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Storage } from '../../types';
import { getClientConfig } from '../../util/httpClient';
import { RootState } from '../store';
import axios from 'axios';

export interface StorageState {
    storages: Storage[];
    selected: string | undefined;
    changed: boolean;
}

const initialState: StorageState = {
    storages: [],
    selected: undefined,
    changed: false
};

export const getStorages = createAsyncThunk('get/storages', async () => {
    const response = await axios.get('/store', getClientConfig());
    return response.data;
});

export const createStorage = createAsyncThunk('create/storage', async (name: string) => {
    return axios.put(`/store/${name}`, getClientConfig());
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
            .addCase(createStorage.fulfilled, (state) => {
                state.changed = true;
            })
            .addCase(getStorages.rejected, (state) => {
                state.storages = [];
            });
    }
});

export const selectStorages = (state: RootState) => state.storage;
export const { selectStore } = storageSlice.actions
export default storageSlice.reducer;