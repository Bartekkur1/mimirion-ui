import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { patchConfig, selectConfigurations } from "../../store/reducers/config";
import { selectStorages } from "../../store/reducers/storage";
import { AddConfigModal } from "./AddConfig";
import { VersionLabel } from "./VersionLabel";

export const Header: FC = () => {

    const [AddConfigVisible, ChangeAddConfigVisibilty] = useState(false);
    const { versions, selectedVersion } = useAppSelector(selectConfigurations);
    const { selected } = useAppSelector(selectStorages);
    const dispatch = useDispatch();

    const patchConfigAction = (action: 'publish' | 'unpublish') => {
        if (selected !== undefined) {
            dispatch(patchConfig({
                action,
                id: selected,
                version: selectedVersion
            }));
        }
    };

    if (selected === undefined) {
        return (
            <div className="label-title">Select a store</div>
        )
    }

    return (
        <div className="header-container">
            <AddConfigModal visible={AddConfigVisible} close={ChangeAddConfigVisibilty} />
            <input className="header-button" type={"button"} value="Add Config" onClick={() => ChangeAddConfigVisibilty(true)} />
            {versions.length > 0 &&
                <>
                    <input className="header-button" type={"button"} value="Publish Config" onClick={() => patchConfigAction('publish')} />
                    <input className="header-button" type={"button"} value="Unpublish Config" onClick={() => patchConfigAction('unpublish')} />
                </>
            }
            <VersionLabel />
            <span>Live version: {versions.find(v => v.live)?.id || "none"}</span>
        </div>
    )
};