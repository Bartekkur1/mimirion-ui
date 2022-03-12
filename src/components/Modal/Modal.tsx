import { FC, FormEvent } from "react";
import "./Modal.css";

export interface ModalProps {
    title: string;
    submit: () => void;
    onClick?: () => void | undefined;
}

export interface ModalSettings {
    visible: boolean;
    close: (state: boolean) => void;
}

export const Modal: FC<ModalProps> = ({ title, submit, onClick, children }) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submit();
    };

    return (
        <div className="modal-container" onClick={onClick && onClick}>
            <form className="modal-body" onSubmit={(e) => handleSubmit(e)}>
                <label className="modal-title">{title}</label>
                {children}
            </form>
        </div>
    );
};