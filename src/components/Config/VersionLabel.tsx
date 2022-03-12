import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { getConfig, getVersions, selectConfigurations, setVersion } from "../../store/reducers/config";
import { selectStorages } from "../../store/reducers/storage";

export const VersionLabel: FC = () => {

    const { versions, changed } = useAppSelector(selectConfigurations);
    const { selected } = useAppSelector(selectStorages);
    const [selectedVersion, selectVersion] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedVersion === undefined && versions.length > 0) {
            selectVersion(versions[0].id)
        }
    }, [versions]);

    useEffect(() => {
        if (selected !== undefined) {
            dispatch(getConfig({ id: selected, version: selectedVersion || '1' }));
        }
    }, [versions, selectedVersion])

    useEffect(() => {
        dispatch(setVersion(selectedVersion));
    }, [selectedVersion]);

    useEffect(() => {
        if (selected !== undefined) {
            dispatch(getVersions(selected))
        }
    }, [changed]);

    if (versions.length === 0) {
        return <></>
    }

    return (
        <div className="version-label-container">
            <select
                className={"versions-select"}
                value={selectedVersion} onChange={e => selectVersion(e.currentTarget.value)}>
                {versions.map(({ id }) => {
                    return <option key={id} value={id}>Version: {id}</option>
                })}
            </select>
        </div>
    )
}