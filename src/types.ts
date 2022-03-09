export interface Storage {
    id: string;
    name: string;
    createdAt: number;
    live: undefined | number;
};

export interface ConfigVersion {
    id: string;
    createdAt: number;
    live: string;
};

export enum AsyncStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    FINISHED = 'finished',
    FAILED = 'failed'
};

export enum StorageKeys {
    ADMIN_KEY = 'ADMIN_KEY',
    MIMIRION_URL = 'MIMIRION_URL'
};