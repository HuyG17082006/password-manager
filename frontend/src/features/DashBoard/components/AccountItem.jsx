import {
    FaGlobe,
    FaUser,
    FaEnvelope,
    FaCalendarPlus,
    FaClock
} from "react-icons/fa";

import { formatDate } from "../../../utils/format";

import "../styles/AccountItem.scss";

import useAccountDetail from "../../../shared/hooks/useAccountDetail.jsx";

export default function AccountItem({

    id,
    applicationName,
    username,
    email,
    owner,
    isPinned,

    createdAt,
    updatedAt

}) {

    const {
        open
    } = useAccountDetail();


    return (

        <div
            className={`account-item ${isPinned ? "pinned" : ""}`}
            id={id}
            onClick={() => open("view", { accountId : id })}
        >

            <div className="account-upper">

                <div className="icon">
                    <FaGlobe />
                </div>

                <div className="content">

                    <h3 className="title">
                        {applicationName}
                    </h3>

                    {
                        username &&
                        <span>
                            <FaUser />
                            {username}
                        </span>
                    }

                    {
                        email &&
                        <span>
                            <FaEnvelope />
                            {email}
                        </span>
                    }

                    {
                        owner &&
                        <span className="owner">
                            Owner: {owner}
                        </span>
                    }

                </div>

            </div>

            <div className="account-lower">

                <span>
                    <FaCalendarPlus />
                    Created: {formatDate(createdAt)}
                </span>

                <span>
                    <FaClock />
                    Updated: {formatDate(updatedAt)}
                </span>

            </div>

        </div>

    );

}