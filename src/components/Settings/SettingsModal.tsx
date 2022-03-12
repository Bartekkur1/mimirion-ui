import { FC, useEffect, useState } from "react";
import { StorageKeys } from "../../types";
import { Modal, ModalSettings } from "../Modal/Modal";

export const SettingsModal: FC<ModalSettings> = ({ close, visible }) => {

    const [adminKey, setKey] = useState("");
    const [url, setUrl] = useState("");

    const save = () => {
        localStorage.setItem(StorageKeys.ADMIN_KEY, adminKey);
        localStorage.setItem(StorageKeys.MIMIRION_URL, url);
        close(!visible);
    }

    useEffect(() => {
        setKey(localStorage.getItem(StorageKeys.ADMIN_KEY) || "");
        setUrl(localStorage.getItem(StorageKeys.MIMIRION_URL) || "");
    }, []);

    return visible ? <Modal title="Settings" submit={() => { }}>
        <span className="keys-title">Mimirion URL</span>
        <input type="text" className="modal-input" value={url}
            onChange={(e) => setUrl(e.currentTarget.value)} />
        <span className="keys-title">Admin key</span>
        <input type="text" className="modal-input" value={adminKey}
            onChange={(e) => setKey(e.currentTarget.value)} />
        <div className="modal-buttons">
            <input className="white-background" type="button" value="Close" onClick={() => close(!visible)} />
            <input className="black-background" type="submit" value="Save" onClick={() => save()} />
        </div>
    </Modal> : null;
};