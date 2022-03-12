import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStorage, selectStorages, unsetKeys } from "../../store/reducers/storage";
import { Modal, ModalSettings } from "../Modal/Modal";

export const AddStoreModal: FC<ModalSettings> = ({ visible, close }) => {

    const [name, setName] = useState("");

    const dispatch = useDispatch();

    const { keys } = useSelector(selectStorages);

    useEffect(() => {
        setName("");
    }, [])

    const addStore = () => {
        dispatch(createStorage(name));
    }

    return visible ? <Modal title="Add Store" submit={addStore}>
        {keys === undefined &&
            <input type="text" maxLength={40} autoFocus={true} className="modal-input" placeholder="Name"
                value={name} onChange={(e) => setName(e.currentTarget.value)} />}
        {keys !== undefined &&
            <>
                <span className="keys-title">Access Key</span>
                <span className="keys-output">{keys.accessKey}</span>
                <span className="keys-title">Restore Key</span>
                <span className="keys-output">{keys.restoreKey}</span>
            </>
        }
        <div className="modal-buttons">
            <input className="white-background" type="button" value="Close" onClick={() => {
                setName("");
                dispatch(unsetKeys());
                close(!visible);
            }} />
            {keys === undefined &&
                <input className="black-background" type="submit" value="Submit" />
            }
        </div>
    </Modal> : null;
};