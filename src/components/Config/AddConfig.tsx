import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConfig, getVersions } from "../../store/reducers/config";
import { selectStorages } from "../../store/reducers/storage";
import { Modal, ModalSettings } from "../Modal/Modal";

export const AddConfigModal: FC<ModalSettings> = ({ close, visible }) => {

    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const { selected, changed } = useSelector(selectStorages);

    useEffect(() => {
        if (selected !== undefined) {
            dispatch(getVersions(selected));
        }
    }, [changed])

    const submit = () => {
        if (selected !== undefined) {
            dispatch(createConfig({
                id: selected,
                config: value
            }));
        }
        close(!visible);
    };

    return visible ? <Modal title="Add Config" submit={() => { }}>
        <textarea className="modal-text-area" autoFocus={true} placeholder={"{}"} onChange={(e) => setValue(e.currentTarget.value)} />
        <div className="modal-buttons">
            <input className="white-background" type="button" value="Close" onClick={() => close(!visible)} />
            <input className="black-background" type="submit" value="Submit" onClick={() => submit()} />
        </div>
    </Modal> : null;
};