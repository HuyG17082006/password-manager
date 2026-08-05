import {
    FaSave,
    FaTimes,
    FaPen,
    FaUndoAlt
} from "react-icons/fa";

import "../../styles/AccountDetail/AccountActions.scss";
import { useLocation } from "react-router";

export default function AccountActions({

    mode,

    loading,

    onSave,

    onCancel,

    onEdit,

    onRestore

}) {

    const location = useLocation();

    const isTrash = location.pathname.includes("trash");

    const saveAndClose = async () => {
        const result = await onSave() || false
        console.log(result)
        if (result)
            onCancel();
    }

    if (mode === "view") {

        return (

            <div className="account-actions">

                <div className="account-actions-button">

                    {
                        isTrash &&
                        <button
                            className="restore"
                            onClick={onRestore}
                        >

                            <FaUndoAlt />

                            Restore

                        </button>
                    }

                    <button
                        className="primary"
                        onClick={onEdit}
                    >

                        <FaPen />

                        Edit

                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="account-actions">

            <p>
                Tips: You only need to provide <strong>Username</strong> or <strong>Email</strong>.
            </p>

            <div className="account-actions-button">

                <button
                    onClick={onCancel}
                >

                    <FaTimes />

                    Cancel

                </button>

                <button
                    className="primary"
                    onClick={saveAndClose}
                    disabled={loading}
                >

                    <FaSave />

                    Save

                </button>

            </div>

        </div>

    );

}