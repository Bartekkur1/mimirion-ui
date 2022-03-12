import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { getVersions } from "../../store/reducers/config";
import { getStorages, selectStorages, selectStore } from "../../store/reducers/storage";
import { SettingsModal } from "../Settings/SettingsModal";
import { AddStoreModal } from "../Store/AddStore";


export const Sidebar: FC = () => {

    const dispatch = useDispatch();
    const { storages, selected, changed } = useAppSelector(selectStorages);

    const [AddStoreVisible, ChangeAddStoreVisibilty] = useState(false);
    const [SettingsVisible, ChangeSettingsVisibilty] = useState(false);

    useEffect(() => {
        dispatch(getStorages());
    }, [changed]);

    useEffect(() => {
        dispatch(getStorages());
    }, []);

    useEffect(() => {
        if (selected !== undefined) {
            dispatch(getVersions(selected));
        }
    }, [selected]);

    const refreshData = () => {
        dispatch(getStorages());
    };

    return (
        <div className="sidebar-container">
            <AddStoreModal visible={AddStoreVisible} close={ChangeAddStoreVisibilty} />
            <SettingsModal visible={SettingsVisible} close={ChangeSettingsVisibilty} />

            <div className="sidebar-logo">Mimirion</div>
            <div className="sidebar-search-container">
                <input placeholder="Search stores..." className="sidebar-search-input" type={"text"} />
            </div>

            <div className="sidebar-label">Actions</div>
            <div className="sidebar-button" onClick={() => refreshData()}>Refresh</div>
            <div className="sidebar-button" onClick={() => ChangeAddStoreVisibilty(true)}>Add Storage</div>
            <div className="sidebar-button" onClick={() => ChangeSettingsVisibilty(true)}>Settings</div>

            <div className="sidebar-label">Storages</div>

            {storages.map(({ id, name }) => {
                const className = "sidebar-button " + (selected === id ? "selected" : "");
                return <div
                    key={id}
                    className={className}
                    onClick={() => dispatch(selectStore(id))}
                >
                    {name}
                </div>
            })}
        </div>
    )
};