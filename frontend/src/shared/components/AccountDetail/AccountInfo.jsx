import {
    FaClock,
    FaCalendarAlt
} from "react-icons/fa";

import { formatDate } from "../../../utils/format";

import "../../styles/AccountDetail/AccountInfo.scss";

export default function AccountInfo({

    mode,
    account

}) {

    if (mode === "create")
        return null;

    return (

        <section className="account-info">

            <div className="section-title">

                <h3>Information</h3>

                <span>Metadata</span>

            </div>

            <div className="row">

                <div>

                    <FaCalendarAlt />

                    <span>Created</span>

                    <strong>

                        {formatDate(account.createdAt)}

                    </strong>

                </div>

                <div>

                    <FaClock />

                    <span>Updated</span>

                    <strong>

                        {formatDate(account.updatedAt)}

                    </strong>

                </div>

            </div>

        </section>

    );

}