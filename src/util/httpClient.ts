import { StorageKeys } from "../types";

export const getClientConfig = () => ({
    headers: {
        'x-admin-key': localStorage.getItem(StorageKeys.ADMIN_KEY) || ""
    },
    baseURL: localStorage.getItem(StorageKeys.MIMIRION_URL) || ""
});