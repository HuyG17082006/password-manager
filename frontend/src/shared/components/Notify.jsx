import React from "react";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes
} from "react-icons/fa";

import notifyStore from "../../store/notifyStore.js";

import "../styles/Notify.scss";

const ICONS = {
    success: <FaCheckCircle />,
    error: <FaTimesCircle />,
    warning: <FaExclamationTriangle />,
    info: <FaInfoCircle />
};

export default function Notify() {

    const notis = notifyStore(state => state.notis);
    const remove = notifyStore(state => state.remove);

    return (

        <div className="notify-container">

            {

                notis.map(noti => (

                    <div
                        key={noti.id}
                        className={`notify notify-${noti.type}`}
                    >

                        <div className="notify-icon">

                            {ICONS[noti.type]}

                        </div>

                        <div className="notify-content">

                            {noti.message}

                        </div>

                        <button
                            className="notify-close"
                            onClick={() => remove(noti.id)}
                        >

                            <FaTimes />

                        </button>

                    </div>

                ))

            }

        </div>

    );

}