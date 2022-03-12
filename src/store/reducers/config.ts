import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ConfigVersion } from "../../types";
import { getClientConfig } from "../../util/httpClient";
import { RootState } from "../store";

export interface ConfigState {
    versions: ConfigVersion[];
    value: any;
    selectedVersion: number;
    changed: boolean;
}

const initialState: ConfigState = {
    versions: [],
    value: undefined,
    changed: false,
    selectedVersion: 1
};

export const getVersions = createAsyncThunk('get/versions', async (id: string) => {
    const result = await axios.get(`/config/versions?id=${id}`, getClientConfig());
    return result.data;
});

interface RemoveConfig {
    id: string;
    version: number;
}

export const removeConfig = createAsyncThunk('delete/config', async ({ id, version }: RemoveConfig) => {
    return axios.delete(`/config/${version}?id=${id}`, getClientConfig());
});

interface CreateConfig {
    id: string;
    config: any;
}

export const createConfig = createAsyncThunk('create/config', async ({ id, config }: CreateConfig) => {
    return axios.put(`/config?id=${id}`, config, getClientConfig());
});

interface PatchConfig {
    version: number;
    action: "publish" | "unpublish";
    id: string;
};

export const patchConfig = createAsyncThunk('publish/config', async ({ id, action, version }: PatchConfig) => {
    return axios.patch(`/config/${action}/${version}?id=${id}`, {}, getClientConfig());
});

interface GetConfigPayload {
    id: string;
    version: string;
}

export const getConfig = createAsyncThunk('get/config', async ({ id, version }: GetConfigPayload) => {
    const result = await axios.get(`/config?id=${id}&version=${version}`, getClientConfig());
    return result.data;
});

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setVersion: (state, action) => {
            state.selectedVersion = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getConfig.rejected, (state) => {
                state.value = undefined;
            })
            .addCase(patchConfig.fulfilled, (state) => {
                state.changed = true;
            })
            .addCase(createConfig.fulfilled, (state) => {
                state.changed = true;
            })
            .addCase(removeConfig.fulfilled, (state) => {
                state.changed = true;
            })
            .addCase(getConfig.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(getVersions.fulfilled, (state, action) => {
                state.versions = action.payload;
                state.changed = false;
            })
    }
});

export const selectConfigurations = (state: RootState) => state.config;
export const { setVersion } = configSlice.actions
export default configSlice.reducer;