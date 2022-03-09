import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { getConfig, selectConfigurations } from "../../store/reducers/config";
import { selectStorages } from "../../store/reducers/storage";

export const VersionLabel: FC = () => {

    const { versions } = useAppSelector(selectConfigurations);
    const { selected } = useAppSelector(selectStorages);
    const [selectedVersion, selectVersion] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        selectVersion(versions.find(v => v.live)?.id.toString());
    }, [versions]);

    useEffect(() => {
        if (selected !== undefined) {
            dispatch(getConfig({ id: selected, version: selectedVersion || '1' }));
        }
    }, [versions, selectedVersion])


    if (selected === undefined) {
        return (
            <div className="label-title">Select a store</div>
        )
    }

    if (selected && versions.length === 0) {
        return (
            <div className="label-title">No published versions!</div>
        )
    }

    return (
        <div>
            <select
                className={"versions-select " + (versions.find(v => v.live)?.id == selectedVersion ? "option-live" : "")}
                value={selectedVersion} onChange={e => selectVersion(e.currentTarget.value)}>
                {versions.map(({ id, live }) => {
                    return <option key={id} className={live ? "option-live" : "option-not-live"} value={id}>Version: {id}</option>
                })}
            </select>
        </div>
    )
}