import useConfirmBox from "../hooks/useConfirmBox.jsx";

import "../styles/ConfirmBox.scss";

import { FaExclamation } from "react-icons/fa";

export default function ConfirmBox() {

    const {
        isOpen,
        title,
        message,
        callback,
        close,
        open
    } = useConfirmBox();

    if (!isOpen)
        return null;

    const confirm = () => {

        callback?.();

        close();

    }

    return (

        <div
            className="confirm-overlay"
            onClick={close}
        >

            <div
                className="confirm-box"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="confirm-icon">

                    <FaExclamation />

                </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="actions">

                    <button
                        className="cancel"
                        onClick={close}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm"
                        onClick={confirm}
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>

    );

}